<script setup lang="ts">
</script>

<template>
  <section class="template-slide">
    <div class="energy-field pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-center px-6 text-center md:px-12">
      <h2 class="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-tight text-transparent">
        Приходи
      </h2>

      <p class="mt-8 text-[clamp(1.2rem,2vw,2rem)] font-medium [color:color-mix(in_srgb,var(--ink)_86%,transparent)]">
        Платформа городских событий для активных жителей, которая помогает быстро находить мероприятия и компанию на вечер.
      </p>
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
