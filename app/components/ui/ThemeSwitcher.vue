<script setup lang="ts">
const { theme, randomizeTheme } = useTheme()

const switchTheme = () => {
  const next = randomizeTheme()
  console.log(
    `[ThemeSwitcher] primary=${next.primary} secondary=${next.secondary} gradient="${next.gradient}" bg_style=${next.bg_style}`,
  )
}
</script>

<template>
  <button
    class="theme-switcher fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-3xl px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    type="button"
    aria-label="Switch Theme"
    @click="switchTheme"
  >
    <span class="theme-switcher__dot" aria-hidden="true" />
    <span>Switch Theme</span>
    <span class="theme-switcher__codes" aria-hidden="true">
      {{ theme.primary }} / {{ theme.secondary }}
    </span>
  </button>
</template>

<style scoped>
.theme-switcher {
  border: 1px solid color-mix(in srgb, var(--text-color, var(--fg)) 14%, transparent);
  background: linear-gradient(125deg, var(--primary), var(--secondary));
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
}

.theme-switcher__dot {
  inline-size: 0.72rem;
  block-size: 0.72rem;
  border-radius: 999px;
  background:
    radial-gradient(
      circle at 30% 30%,
      var(--bg-color, var(--bg-surface)) 0%,
      color-mix(in srgb, var(--bg-color, var(--bg-surface)) 45%, transparent) 28%,
      transparent 32%
    ),
    linear-gradient(125deg, var(--secondary), var(--primary));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--bg-color, var(--bg-surface)) 40%, transparent);
}

.theme-switcher__codes {
  display: none;
  opacity: 0.82;
  font-size: 0.58rem;
  letter-spacing: 0.05em;
}

@media (min-width: 1120px) {
  .theme-switcher__codes {
    display: inline;
  }
}
</style>
