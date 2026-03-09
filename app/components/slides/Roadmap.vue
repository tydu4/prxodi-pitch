<template>
  <section class="template-slide relative isolate h-full overflow-hidden flex flex-col justify-center">
    <div class="energy-field pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 text-center mb-16">
      <h2 class="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-[clamp(2.5rem,4vw,4rem)] font-black text-transparent">
        Проделанная работа и планы
      </h2>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12 mb-16">
      <div class="relative flex justify-between items-start w-full">
        <div class="absolute top-[24px] left-0 w-full h-1 bg-[color:color-mix(in_srgb,var(--ink)_10%,transparent)] z-0">
           <div class="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
        </div>

        <div class="relative z-10 w-1/4 text-center pr-4">
          <div class="w-12 h-12 mx-auto bg-[var(--primary)] rounded-full flex items-center justify-center text-[var(--surface)] text-xl font-bold shadow-[0_0_20px_var(--primary)] mb-4">✓</div>
          <h3 class="text-xl font-black text-[var(--ink)] mb-2">Q1 2026: MVP</h3>
          <p class="text-sm font-medium text-[color:color-mix(in_srgb,var(--ink)_60%,transparent)]">Разработка системы парсинга, CustDev, запуск Telegram-ботов.</p>
        </div>

        <div class="relative z-10 w-1/4 text-center px-2">
          <div class="w-12 h-12 mx-auto bg-[var(--secondary)] rounded-full flex items-center justify-center text-[var(--surface)] border-4 border-[var(--surface)] text-xl font-bold shadow-[0_0_20px_var(--secondary)] mb-4">🔥</div>
          <h3 class="text-xl font-black text-[var(--ink)] mb-2">Q2 2026: Пилот</h3>
          <p class="text-sm font-medium text-[color:color-mix(in_srgb,var(--ink)_60%,transparent)]">Запуск в Ярославле. Сбор лояльной аудитории.</p>
        </div>

        <div class="relative z-10 w-1/4 text-center px-2 opacity-50">
          <div class="w-12 h-12 mx-auto bg-[var(--surface)] rounded-full border-4 border-[color:color-mix(in_srgb,var(--ink)_20%,transparent)] mb-4"></div>
          <h3 class="text-xl font-black text-[var(--ink)] mb-2">Q3 2026: B2B</h3>
          <p class="text-sm font-medium text-[color:color-mix(in_srgb,var(--ink)_60%,transparent)]">Интеграция платежей и эквайринга, личные кабинеты организаторов, запуск продаж.</p>
        </div>

        <div class="relative z-10 w-1/4 text-center pl-4 opacity-50">
          <div class="w-12 h-12 mx-auto bg-[var(--surface)] rounded-full border-4 border-[color:color-mix(in_srgb,var(--ink)_20%,transparent)] mb-4"></div>
          <h3 class="text-xl font-black text-[var(--ink)] mb-2">Q4 2026: Масштабирование</h3>
          <p class="text-sm font-medium text-[color:color-mix(in_srgb,var(--ink)_60%,transparent)]">Расширение на новые города, рост количества пользователей, развитие партнерств</p>
        </div>
      </div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[1000px] px-6 md:px-12">
      <article class="rounded-3xl border-2 border-[var(--secondary)] bg-[color:color-mix(in_srgb,var(--surface)_95%,var(--secondary)_5%)] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] text-center">
        <h3 class="text-2xl font-black text-[var(--ink)] uppercase tracking-widest mb-6">На что пойдет грант</h3>
        
        <div class="h-6 w-full rounded-full bg-[color:color-mix(in_srgb,var(--ink)_10%,transparent)] overflow-hidden flex mb-4">
           <div class="h-full bg-[var(--primary)] flex items-center justify-center text-[var(--surface)] text-xs font-bold" style="width: 70%">70%</div>
           <div class="h-full bg-[var(--secondary)] flex items-center justify-center text-[var(--surface)] text-xs font-bold" style="width: 30%">30%</div>
        </div>
        
        <div class="flex justify-between px-2">
           <div class="text-left w-1/2">
              <p class="text-lg font-bold text-[var(--primary)]">Маркетинг и привлечение пользователей</p>
              <p class="text-sm text-[color:color-mix(in_srgb,var(--ink)_60%,transparent)] font-medium mt-1">Запуск в новых городах, рост аудитории платформы</p>
           </div>
           <div class="text-right w-1/2">
              <p class="text-lg font-bold text-[var(--secondary)]">Доработка AI</p>
              <p class="text-sm text-[color:color-mix(in_srgb,var(--ink)_60%,transparent)] font-medium mt-1">Обучение рекомендательной системы, улучшение сбора событий.</p>
           </div>
        </div>
      </article>
    </div>

  </section>
</template>

<style scoped>
.template-slide {
  block-size: 100vh;
  --surface: var(--bg-color, var(--bg-surface));
  --ink: var(--text-color, var(--fg));
  background: var(--surface);
  color: var(--ink);
}
.energy-field {
  background:
    radial-gradient(circle at 14% 20%, color-mix(in srgb, var(--primary) 15%, transparent) 0%, transparent 42%),
    radial-gradient(circle at 86% 80%, color-mix(in srgb, var(--secondary) 15%, transparent) 0%, transparent 42%),
    linear-gradient(to right, color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px);
  background-size: auto, auto, 46px 46px, 46px 46px;
}
</style>