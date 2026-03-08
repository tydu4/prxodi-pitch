import pathlib

# Список того, что нам нафиг не нужно видеть
IGNORE_DIRS = {
    '__pycache__', '.git', '.venv', 'env', 
    'node_modules', '.pytest_cache', '.idea', '.vscode'
}
IGNORE_FILES = {'.DS_Store', 'Thumbs.db'}
IGNORE_EXT = {'.pyc', '.pyo'}

def print_tree(directory, prefix=""):
    # Получаем список всех файлов и папок, сортируем (папки сверху)
    paths = sorted(pathlib.Path(directory).iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
    
    # Фильтруем мусор
    paths = [
        p for p in paths 
        if p.name not in IGNORE_DIRS 
        and p.name not in IGNORE_FILES 
        and p.suffix not in IGNORE_EXT
    ]

    for i, path in enumerate(paths):
        is_last = (i == len(paths) - 1)
        connector = "└── " if is_last else "├── "
        
        print(f"{prefix}{connector}{path.name}")
        
        if path.is_dir():
            # Если это папка, идем глубже. 
            # Если она последняя в списке, ветка "обрывается" (пробелы вместо |)
            new_prefix = prefix + ("    " if is_last else "│   ")
            print_tree(path, new_prefix)

if __name__ == "__main__":
    print(".") # Корень
    print_tree(".")