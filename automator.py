import json
import os
import subprocess
import sys
import time

# --- НАСТРОЙКИ ---
DB_FILE = "codex_queue.json"

# Модель
MODEL = "gpt-5.3-codex" 

# СИСТЕМНЫЙ ПРОМПТ
# Добавляем в конец, чтобы это было последним, что он прочитает перед задачей
SYSTEM_INSTRUCTION = """"""

class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

if os.name == 'nt':
    os.system('color')

def log(message, color=Colors.ENDC):
    print(f"{color}{message}{Colors.ENDC}")

def load_db():
    if not os.path.exists(DB_FILE): return []
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f: return json.load(f)
    except: return []

def save_db(tasks):
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, indent=4, ensure_ascii=False)

# --- ИСПОЛНЕНИЕ ---

def run_codex_process(user_prompt):
    # 1. Формируем полный текст (Задача + Системная инструкция)
    # Важно: Сначала задача, потом пинок под зад, чтобы он не забыл действовать.
    full_text_payload = f"TASK:\n{user_prompt}\n\n{SYSTEM_INSTRUCTION}"
    
    print("\n" + "-"*50)
    log(f"ЗАГРУЗКА ЗАДАЧИ ЧЕРЕЗ STDIN ({len(full_text_payload)} символов)...", Colors.WARNING)
    print("-"*50 + "\n")

    # 2. Команда запуска БЕЗ промпта в аргументах
    # Codex будет ждать ввод, пока мы его не закроем
    command = f'codex exec --model {MODEL} --dangerously-bypass-approvals-and-sandbox'
    
    log(f"   >>> Запуск процесса: {command}", Colors.BLUE)
    
    try:
        # stdin=subprocess.PIPE позволяет писать в процесс
        process = subprocess.Popen(
            command, 
            shell=True, 
            stdin=subprocess.PIPE,      # Включаем трубу для ввода
            stdout=subprocess.PIPE, 
            stderr=subprocess.STDOUT, 
            text=True, 
            encoding='utf-8',
            errors='replace'
        )

        # 3. ЗАПИСЫВАЕМ ПРОМПТ В CODEX
        # Это самое важное место. Мы пишем в stdin процесса.
        try:
            process.stdin.write(full_text_payload)
            process.stdin.close() # Закрываем поток, чтобы Codex понял: "Ввод закончен, работай!"
        except Exception as e:
            log(f"❌ Ошибка передачи данных в Codex: {e}", Colors.FAIL)
            return "ERROR"

        full_log = ""
        
        # 4. Читаем ответ
        while True:
            line = process.stdout.readline()
            if not line and process.poll() is not None:
                break
            if line:
                print(line, end='') # Вывод в консоль
                full_log += line

        returncode = process.poll()

        # 5. АНАЛИЗ НА "ТУПОСТЬ"
        # Если Codex спрашивает, что делать, значит он не принял задачу.
        bad_phrases = [
            "what should i work on",
            "share the task",
            "ready to work",
            "requesting task clarification",
            "requesting next task"
        ]
        
        lower_log = full_log.lower()
        
        # Если лог слишком короткий (меньше 200 символов) и содержит вопросы - это фейл
        if len(full_log) < 500 and any(phrase in lower_log for phrase in bad_phrases):
             log("\n❌ ОБНАРУЖЕН СБОЙ: Codex задает вопросы вместо работы.", Colors.FAIL)
             log("   Причина: Скорее всего, он решил поболтать. Перезапускаем задачу.", Colors.WARNING)
             return "RETRY_NEEDED"

        if returncode != 0:
            if "quota" in lower_log or "limit" in lower_log or "rate" in lower_log:
                log("\n!!! ЛИМИТЫ ИСЧЕРПАНЫ !!!", Colors.FAIL)
                return "LIMIT_HIT"
            
            log(f"\n❌ Ошибка Codex (Code {returncode})", Colors.FAIL)
            return "ERROR"
            
        log("\n✅ Codex отчитался о завершении.", Colors.GREEN)
        return "SUCCESS"

    except Exception as e:
        log(f"❌ Сбой Python: {e}", Colors.FAIL)
        return "ERROR"

def run_git_workflow(commit_msg):
    try:
        status = subprocess.run("git status --porcelain", capture_output=True, text=True, shell=True)
        if not status.stdout.strip():
            log("   ⚠️ Git: Файлы не изменились. Коммитить нечего.", Colors.WARNING)
            return False # Возвращаем False, чтобы не считать задачу сделанной, раз изменений нет

        subprocess.run("git add .", check=True, shell=True, stdout=subprocess.DEVNULL)
        subprocess.run(f'git commit -m "{commit_msg}"', check=True, shell=True, stdout=subprocess.DEVNULL)
        log(f"   >>> Git Commit: '{commit_msg}'", Colors.GREEN)

        log("   >>> Git Push...", Colors.BLUE)
        subprocess.run("git push origin main", check=True, shell=True, stdout=subprocess.DEVNULL)
        log("   ✅ Git Push: Успешно.", Colors.GREEN)
        return True

    except subprocess.CalledProcessError:
        log(f"❌ ОШИБКА GIT.", Colors.FAIL)
        return False

# --- UI ---

def add_task_ui():
    tasks = load_db()
    log("\n--- ДОБАВЛЕНИЕ ЗАДАЧИ ---", Colors.HEADER)
    title = input("Название коммита: ").strip()
    if not title: return

    log("Промпт (END для конца):")
    lines = []
    while True:
        try:
            line = input()
            if line.strip() == "END": break
            lines.append(line)
        except EOFError: break
            
    full_prompt = "\n".join(lines).strip()
    if not full_prompt: return
    tasks.append({"commit_title": title, "prompt": full_prompt, "is_done": False})
    save_db(tasks)
    log(f"Сохранено. Задач: {len(tasks)}", Colors.GREEN)

def execute_tasks_ui():
    tasks = load_db()
    pending = [t for t in tasks if not t['is_done']]
    
    if not pending:
        log("Нет задач.", Colors.WARNING)
        return

    log(f"\n--- ЗАПУСК (Задач: {len(pending)}) ---", Colors.HEADER)
    if not os.path.isdir(".git"):
        log("ОШИБКА: Нет git.", Colors.FAIL)
        return

    for i, task in enumerate(tasks):
        if task['is_done']: continue

        log(f"\n[{i+1}/{len(tasks)}] {Colors.BOLD}{task['commit_title']}{Colors.ENDC}", Colors.BLUE)
        
        # Попытка выполнения
        status = run_codex_process(task['prompt'])
        
        if status == "LIMIT_HIT":
            sys.exit(1)
        elif status == "RETRY_NEEDED":
             # Если он затупил, можно попробовать еще раз или пропустить
             # Пока просто остановим, чтобы ты не тратил попытки зря
             log("Остановка, так как модель тупит.", Colors.FAIL)
             sys.exit(1)
        elif status == "ERROR":
            log("Ошибка.", Colors.FAIL)
            sys.exit(1)
            
        # Проверка Git

        tasks[i]['is_done'] = True
        save_db(tasks)

            
        time.sleep(2) 
    
    log("\n--- ГОТОВО ---", Colors.GREEN)

def main():
    while True:
        print("\n" + "="*30)
        print("CODEX AUTO v10 (STDIN FIX)")
        print("1. Добавить | 2. ЗАПУСК | 0. Выход")
        choice = input("> ").strip()
        if choice == "1": add_task_ui()
        elif choice == "2": execute_tasks_ui()
        elif choice == "0": break

if __name__ == "__main__":
    main()

