<script setup lang="ts">
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ControlPanel from '~/components/ui/ControlPanel.vue'

gsap.registerPlugin(ScrollTrigger)

const slidesRoot = ref<HTMLElement | null>(null)

let lenis: Lenis | null = null
let rafId = 0

const onRaf = (time: number) => {
  lenis?.raf(time)
  rafId = window.requestAnimationFrame(onRaf)
}

onMounted(() => {
  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: false,
    wheelMultiplier: 0.8,
    syncTouch: false,
    gestureOrientation: 'vertical',
  })

  lenis.on('scroll', ScrollTrigger.update)
  ;(window as Window & { __lenis?: Lenis | null }).__lenis = lenis
  rafId = window.requestAnimationFrame(onRaf)
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  if (rafId) {
    window.cancelAnimationFrame(rafId)
  }

  lenis?.destroy()
  lenis = null
  ;(window as Window & { __lenis?: Lenis | null }).__lenis = null
})
</script>

<template>
  <div ref="slidesRoot" class="slides-shell">
    <NuxtRouteAnnouncer />

    <main class="slides-content">
      <NuxtPage />
    </main>

    <ControlPanel />
  </div>
</template>

<style scoped>
.slides-shell {
  min-block-size: 100dvh;
}

.slides-content {
  min-block-size: 100dvh;
}
</style>
