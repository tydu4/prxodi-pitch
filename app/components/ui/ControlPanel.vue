<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePdfExport } from '~/composables/usePdfExport'

const isVisible = ref(false)
const copied = ref(false)
let copiedTimer = 0
let autoThemeTimer = 0

const { theme, generateRandomTheme } = useTheme()
const { isPSBMode, isAutoTheme, togglePSBMode, setAutoTheme } = usePresentationMode()
const { exportPdf, resetView, isExporting, needsReload } = usePdfExport()

const activeTheme = computed(() => {
  return `${theme.value.primary} / ${theme.value.secondary}`
})

const onKeyDown = (event: KeyboardEvent) => {
  if (event.repeat) {
    return
  }

  if (event.key.toLowerCase() === 'l') {
    isVisible.value = !isVisible.value
  }
}

const onGenerateTheme = () => {
  generateRandomTheme()
}

const startAutoTheme = () => {
  if (!import.meta.client || autoThemeTimer) {
    return
  }

  autoThemeTimer = window.setInterval(() => {
    generateRandomTheme()
  }, 13000)
}

const stopAutoTheme = () => {
  if (!import.meta.client || !autoThemeTimer) {
    return
  }

  window.clearInterval(autoThemeTimer)
  autoThemeTimer = 0
}

const onToggleTargetMode = () => {
  togglePSBMode()
}

const onToggleDiscoMode = () => {
  setAutoTheme(!isAutoTheme.value)
}

const onExportPdf = async () => {
  await exportPdf()
}

const onCopyThemeConfig = async () => {
  if (!import.meta.client || !navigator.clipboard) {
    return
  }

  const payload = JSON.stringify({
    primary: theme.value.primary,
    secondary: theme.value.secondary,
    gradient: theme.value.gradient,
    bg_style: theme.value.bg_style,
  }, null, 2)

  try {
    await navigator.clipboard.writeText(payload)
    copied.value = true

    if (copiedTimer) {
      window.clearTimeout(copiedTimer)
    }

    copiedTimer = window.setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

watch(
  isAutoTheme,
  (enabled) => {
    if (!import.meta.client) {
      return
    }

    if (enabled) {
      generateRandomTheme()
      startAutoTheme()
      return
    }

    stopAutoTheme()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  if (copiedTimer) {
    window.clearTimeout(copiedTimer)
  }
  stopAutoTheme()
})
</script>

<template>
  <div class="panel-anchor pointer-events-none fixed bottom-5 right-5 z-[1200]">
    <Transition name="panel-slide">
      <aside v-if="isVisible" class="control-panel pointer-events-auto">
        <header class="panel-header">
          <p class="panel-kicker">Control Panel</p>
          <p class="panel-hint">Press L to toggle</p>
        </header>

        <div class="panel-body">
          <p class="theme-label">
            Theme:
            <strong>{{ activeTheme }}</strong>
          </p>

          <button type="button" class="panel-btn panel-btn--mode" @click="onToggleTargetMode">
            Target: {{ isPSBMode ? 'PSB' : 'General' }}
          </button>

          <button
            type="button"
            class="panel-btn panel-btn--disco"
            :class="{ 'panel-btn--disco-active': isAutoTheme }"
            @click="onToggleDiscoMode"
          >
            Disco Mode: {{ isAutoTheme ? 'ON' : 'OFF' }}
          </button>

          <button type="button" class="panel-btn panel-btn--theme" @click="onGenerateTheme">
            Generate Theme
          </button>

          <button
            type="button"
            class="panel-btn panel-btn--copy"
            @click="onCopyThemeConfig"
          >
            <span>{{ copied ? 'Theme Copied' : 'Copy Theme Config' }}</span>
            <span class="copy-check" :class="{ 'copy-check--visible': copied }" aria-hidden="true">&#10003;</span>
          </button>

          <button
            type="button"
            class="panel-btn panel-btn--export"
            :disabled="isExporting"
            @click="onExportPdf"
          >
            {{ isExporting ? 'Preparing PDF...' : 'Export PDF' }}
          </button>

          <button type="button" class="panel-btn panel-btn--reset" @click="resetView">
            Reset View
          </button>

          <p v-if="needsReload" class="reload-note">
            Export finished. Reset View to restore animations.
          </p>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<style scoped>
.control-panel {
  inline-size: min(88vw, 340px);
  border: 1px solid color-mix(in srgb, var(--text-color, var(--fg)) 14%, transparent);
  border-radius: 1.5rem;
  background: var(--bg-color, var(--bg-surface));
  color: var(--text-color, var(--fg));
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
  overflow: hidden;
  backdrop-filter: blur(12px);
}

.panel-header {
  border-bottom: 1px solid color-mix(in srgb, var(--text-color, var(--fg)) 14%, transparent);
  background: linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--secondary) 70%, var(--primary) 30%));
  color: var(--bg-color, var(--bg-surface));
  padding: 10px 12px 9px;
}

.panel-kicker {
  margin: 0;
  font-size: 0.84rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-hint {
  margin: 4px 0 0;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.95;
}

.panel-body {
  padding: 12px;
  display: grid;
  gap: 10px;
}

.theme-label {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  line-height: 1.3;
}

.panel-btn {
  appearance: none;
  inline-size: 100%;
  border: 1px solid color-mix(in srgb, var(--text-color, var(--fg)) 16%, transparent);
  border-radius: 1.5rem;
  padding: 10px 12px;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.2s ease-out,
    color 0.2s ease-out,
    box-shadow 0.2s ease-out,
    opacity 0.2s ease-out;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

.panel-btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.panel-btn:not(:disabled):hover {
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
}

.panel-btn--theme {
  background: color-mix(in srgb, var(--bg-color, var(--bg-surface)) 90%, var(--primary) 10%);
  color: color-mix(in srgb, var(--text-color, var(--fg)) 86%, var(--primary) 14%);
}

.panel-btn--mode {
  background: color-mix(in srgb, var(--primary) 16%, var(--bg-color, var(--bg-surface)) 84%);
  color: color-mix(in srgb, var(--text-color, var(--fg)) 84%, var(--primary) 16%);
}

.panel-btn--disco {
  background: color-mix(in srgb, var(--secondary) 12%, var(--bg-color, var(--bg-surface)) 88%);
  color: color-mix(in srgb, var(--text-color, var(--fg)) 84%, var(--secondary) 16%);
}

.panel-btn--disco-active {
  background: linear-gradient(120deg, var(--primary), var(--secondary));
  border-color: transparent;
  color: var(--bg-color, var(--bg-surface));
}

.panel-btn--copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: color-mix(in srgb, var(--secondary) 24%, var(--bg-color, var(--bg-surface)) 76%);
  color: color-mix(in srgb, var(--text-color, var(--fg)) 90%, var(--secondary) 10%);
}

.copy-check {
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.copy-check--visible {
  opacity: 1;
  transform: scale(1);
}

.panel-btn--export {
  background: linear-gradient(120deg, var(--primary), var(--secondary));
  border-color: transparent;
  color: var(--bg-color, var(--bg-surface));
}

.panel-btn--reset {
  background: color-mix(in srgb, var(--text-color, var(--fg)) 12%, var(--bg-color, var(--bg-surface)) 88%);
  color: color-mix(in srgb, var(--text-color, var(--fg)) 90%, var(--primary) 10%);
}

.reload-note {
  margin: 2px 0 0;
  font-size: 0.62rem;
  line-height: 1.35;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: opacity 0.26s ease-out, transform 0.26s ease-out;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}
</style>
