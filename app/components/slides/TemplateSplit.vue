<script setup lang="ts">
const points = [
  'Сфокусируйте внимание на одной ключевой идее слайда.',
  'Поддержите тезис цифрами, фактами или коротким кейсом.',
  'Оставьте справа место под визуал, который усиливает смысл.',
]
</script>

<template>
  <section class="template-slide relative overflow-hidden">
    <div class="energy-field pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center px-6 md:px-12 lg:px-16">
      <div class="grid w-full gap-10 lg:grid-cols-2">
        <div class="flex flex-col justify-center">
          <h2 class="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-[clamp(2rem,4vw,4rem)] font-black text-transparent">
            Шаблон Split: смысл + визуал
          </h2>
          <p class="mt-6 text-[clamp(1rem,1.5vw,1.5rem)] font-medium [color:color-mix(in_srgb,var(--ink)_80%,transparent)]">
            Используйте этот формат, когда важно объяснить идею словами и сразу подкрепить ее графикой, схемой или скриншотом.
          </p>
          <ul class="mt-6 list-disc space-y-3 pl-6 text-lg font-medium [color:color-mix(in_srgb,var(--ink)_85%,transparent)]">
            <li v-for="point in points" :key="point">
              {{ point }}
            </li>
          </ul>
        </div>

        <div class="flex items-center">
          <div class="template-card flex w-full aspect-square items-center justify-center rounded-3xl border-2 border-dashed border-[--primary] md:aspect-[4/3]">
            <span class="text-xl font-black [color:color-mix(in_srgb,var(--ink)_75%,transparent)]">
              Место для графики
            </span>
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
</style>
