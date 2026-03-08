<script setup lang="ts">
const cards = [
  {
    title: '240 млрд ₽',
    description: 'Общий объем рынка (Россия). Вся индустрия развлечений и покупки билетов на ивенты.',
  },
  {
    title: '9 млрд ₽',
    description:
      'Доступный рынок. Регионы и города-миллионники (без МСК и СПБ), где крупные игроки игнорируют 70% контента.',
  },
  {
    title: '540 млн ₽',
    description:
      'Достижимый объем. То, что мы заработаем за 2 года, монополизировав информационный вакуум в регионах.',
  },
]
</script>

<template>
  <section class="template-slide relative isolate h-full overflow-hidden">
    <div class="energy-field pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-center px-6 md:px-12 lg:px-16">
      <h2 class="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-[clamp(2rem,4vw,4rem)] font-black text-transparent">
        Свободные рынки против перенасыщенных
      </h2>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article
          v-for="card in cards"
          :key="card.title"
          class="template-card flex flex-col gap-4 rounded-3xl border-2 border-[--primary] p-8"
        >
          <h3 class="text-2xl font-black">
            {{ card.title }}
          </h3>
          <p class="font-medium [color:color-mix(in_srgb,var(--ink)_85%,transparent)]">
            {{ card.description }}
          </p>
        </article>
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
</style>
