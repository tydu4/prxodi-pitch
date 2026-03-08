<template>
  <section class="template-slide relative isolate h-full overflow-hidden">
    <div class="energy-field pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center px-6 md:px-12 lg:px-16">
      <div class="grid w-full gap-10 lg:grid-cols-2">
        <div class="flex flex-col justify-center">
          <h2 class="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-[clamp(2rem,4vw,4rem)] font-black text-transparent">
            Они ждут. Мы забираем.
          </h2>
          <p class="mt-6 text-[clamp(1rem,1.5vw,1.5rem)] font-medium [color:color-mix(in_srgb,var(--ink)_80%,transparent)]">
            Как мы обходим конкурентов на перенасыщенном рынке.
          </p>
          <ul class="mt-6 list-disc space-y-3 pl-6 text-lg font-medium [color:color-mix(in_srgb,var(--ink)_85%,transparent)]">
            <li>Яндекс.Афиша: Ручное добавление (модерация 24 часа), игнорируют андеграунд.</li>
            <li>Telegram-чаты: Хаос, нет поиска, сложно купить билет.</li>
            <li>Prxodi: AI-парсеры забирают данные сами. Публикация за 5 секунд. 100% охват.</li>
          </ul>
        </div>

        <div class="flex items-center">
          <div class="template-card w-full rounded-3xl border border-[color:color-mix(in_srgb,var(--ink)_14%,transparent)] p-4 md:p-6">
            <div class="comparison-grid overflow-hidden rounded-2xl border border-[color:color-mix(in_srgb,var(--ink)_12%,transparent)]">
              <div class="cell head">Функция</div>
              <div class="cell head">Яндекс</div>
              <div class="cell head">Чаты</div>
              <div class="cell head head-prxodi">Prxodi</div>

              <div class="cell label">Полнота базы</div>
              <div class="cell">20%</div>
              <div class="cell">10%</div>
              <div class="cell value-prxodi">100%</div>

              <div class="cell label">Поиск компании</div>
              <div class="cell">Нет</div>
              <div class="cell">Да, но хаос</div>
              <div class="cell value-prxodi">Умный матчинг</div>

              <div class="cell label">Покупка билета</div>
              <div class="cell">Да</div>
              <div class="cell">Нет</div>
              <div class="cell value-prxodi">В 1 клик</div>
            </div>
          </div>
        </div>
      </div>
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

.template-card {
  background: color-mix(in srgb, var(--surface) 95%, var(--primary) 5%);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.template-card:hover {
  border-color: var(--secondary);
  background: color-mix(in srgb, var(--surface) 88%, var(--secondary) 12%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08), 0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
  transform: translateY(-4px);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1.45fr 1fr 1fr 1.2fr;
}

.cell {
  padding: 0.85rem 0.75rem;
  border-right: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  font-size: clamp(0.8rem, 1.1vw, 1rem);
  font-weight: 600;
  text-align: center;
}

.cell:nth-child(4n) {
  border-right: 0;
}

.cell:nth-last-child(-n + 4) {
  border-bottom: 0;
}

.head {
  background: color-mix(in srgb, var(--ink) 8%, transparent);
  font-weight: 800;
}

.head-prxodi {
  color: var(--primary);
}

.label {
  background: color-mix(in srgb, var(--ink) 4%, transparent);
  font-weight: 700;
  text-align: left;
}

.value-prxodi {
  color: var(--primary);
  font-weight: 800;
}

@media (max-width: 640px) {
  .comparison-grid {
    grid-template-columns: 1.2fr 1fr 1fr 1fr;
  }

  .cell {
    padding: 0.7rem 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
