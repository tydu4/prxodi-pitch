<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

// Готовые шаблоны (оставляем закомментированными на случай, если понадобятся)
// import TemplateSplit from '~/components/slides/TemplateSplit.vue'
// import TemplateCards from '~/components/slides/TemplateCards.vue'
// import TemplateTextFocus from '~/components/slides/TemplateTextFocus.vue'

// Рабочие слайды
import Hero from '~/components/slides/Hero.vue'
import ProductIntro from '~/components/slides/ProductIntro.vue'
import Problem from '~/components/slides/Problem.vue'
import Solution from '~/components/slides/Solution.vue'
import Audience from '~/components/slides/Audience.vue'
import Advantage from '~/components/slides/Advantage.vue' // Твои крутые конкуренты
import Market1 from '~/components/slides/Market1.vue'
import Market2 from '~/components/slides/Market2.vue'
import Monetisation from '~/components/slides/Monetisation.vue'
import Economy from '~/components/slides/Economy.vue' // Новый слайд
import Roadmap from '~/components/slides/Roadmap.vue' // Новый слайд
import Team from '~/components/slides/Team.vue'
import PSB from '~/components/slides/PSB.vue'
import Final from '~/components/slides/Final.vue'
import Ecosystem from '~/components/slides/Ecosystem.vue'
import Competitors from '~/components/slides/Competitors.vue'

const { isPSBMode } = usePresentationMode()
let wheelLock = false
let wheelLockTimer = 0
let wheelAccum = 0
let scrollSnapTimer = 0
let programmaticUntil = 0
let touchStartY = 0

const SNAP_SETTLE_DELAY = 120
const SNAP_TOLERANCE = 8

type LenisLike = {
  scrollTo: (target: number, options?: Record<string, unknown>) => void
  scroll?: number
}

const getLenis = (): LenisLike | null => {
  if (!import.meta.client) {
    return null
  }

  return ((window as Window & { __lenis?: LenisLike | null }).__lenis ?? null)
}

const getSlideCount = () => document.querySelectorAll('.deck-slide').length

const getNearestSlideIndex = () => {
  const slideCount = getSlideCount()
  if (!slideCount) {
    return 0
  }

  return Math.max(0, Math.min(Math.round(window.scrollY / window.innerHeight), slideCount - 1))
}

const scrollToSlide = (targetIndex: number) => {
  const slideCount = getSlideCount()
  if (!slideCount) {
    return
  }

  const clampedIndex = Math.max(0, Math.min(targetIndex, slideCount - 1))
  const targetY = clampedIndex * window.innerHeight
  const lenis = getLenis()
  programmaticUntil = Date.now() + 1250
  wheelAccum = 0

  if (lenis) {
    lenis.scrollTo(targetY, { duration: 0.95 })
    window.setTimeout(() => {
      if (Math.abs(window.scrollY - targetY) > 8) {
        window.scrollTo({ top: targetY, behavior: 'auto' })
      }
    }, 90)
    return
  }

  window.scrollTo({ top: targetY, behavior: 'auto' })
}

const moveByDirection = (direction: 1 | -1) => {
  const lenis = getLenis()
  const currentY = typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY
  const currentIndex = Math.round(currentY / window.innerHeight)
  scrollToSlide(currentIndex + direction)
}

const lockDeckNavigation = () => {
  wheelLock = true
  if (wheelLockTimer) {
    window.clearTimeout(wheelLockTimer)
  }
  wheelLockTimer = window.setTimeout(() => {
    wheelLock = false
    wheelLockTimer = 0
    wheelAccum = 0
  }, 620)
}

const triggerDirection = (direction: 1 | -1) => {
  if (wheelLock) {
    return
  }

  lockDeckNavigation()
  moveByDirection(direction)
}

const onDeckKeyDown = (event: KeyboardEvent) => {
  if (event.repeat) {
    return
  }

  if (
    event.key !== 'ArrowDown'
    && event.key !== 'ArrowUp'
    && event.key !== 'ArrowRight'
    && event.key !== 'ArrowLeft'
  ) {
    return
  }

  event.preventDefault()
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    moveByDirection(1)
    return
  }

  moveByDirection(-1)
}

const onDeckWheel = (event: WheelEvent) => {
  const target = event.target as HTMLElement | null
  if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
    return
  }

  if (event.cancelable) {
    event.preventDefault()
  }
  if (wheelLock) {
    return
  }

  wheelAccum += event.deltaY
  if (Math.abs(wheelAccum) < 14) {
    return
  }

  triggerDirection(wheelAccum > 0 ? 1 : -1)
  wheelAccum = 0
}

const settleToNearestSlide = () => {
  if (Date.now() < programmaticUntil || wheelLock) {
    return
  }

  const nearestIndex = getNearestSlideIndex()
  const targetY = nearestIndex * window.innerHeight
  if (Math.abs(window.scrollY - targetY) <= SNAP_TOLERANCE) {
    return
  }

  lockDeckNavigation()
  scrollToSlide(nearestIndex)
}

const onDeckScroll = () => {
  if (scrollSnapTimer) {
    window.clearTimeout(scrollSnapTimer)
  }

  scrollSnapTimer = window.setTimeout(() => {
    settleToNearestSlide()
  }, SNAP_SETTLE_DELAY)
}

const onTouchStart = (event: TouchEvent) => {
  touchStartY = event.changedTouches[0]?.clientY ?? 0
}

const onTouchEnd = (event: TouchEvent) => {
  const endY = event.changedTouches[0]?.clientY ?? touchStartY
  const deltaY = touchStartY - endY

  if (Math.abs(deltaY) < 24) {
    return
  }

  triggerDirection(deltaY > 0 ? 1 : -1)
}

onMounted(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  window.addEventListener('keydown', onDeckKeyDown)
  window.addEventListener('wheel', onDeckWheel, { passive: false, capture: true })
  window.addEventListener('scroll', onDeckScroll, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })

  window.setTimeout(() => {
    settleToNearestSlide()
  }, 0)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onDeckKeyDown)
  window.removeEventListener('wheel', onDeckWheel, true)
  window.removeEventListener('scroll', onDeckScroll)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
  if (wheelLockTimer) {
    window.clearTimeout(wheelLockTimer)
    wheelLockTimer = 0
  }
  if (scrollSnapTimer) {
    window.clearTimeout(scrollSnapTimer)
    scrollSnapTimer = 0
  }
  wheelAccum = 0
  wheelLock = false
})
</script>

<template>
  <div class="deck-stack">
    <section class="deck-slide"><Hero /></section>
    <section class="deck-slide"><ProductIntro /></section>
    <section class="deck-slide"><Problem /></section>
    <section class="deck-slide deck-slide--solution"><Solution /></section>
    <section class="deck-slide"><Audience /></section>
    <section class="deck-slide"><Advantage /></section>
    <section class="deck-slide"><Market2 /></section>
    <section class="deck-slide"><Monetisation /></section>
    <section class="deck-slide"><Economy /></section>
    <section class="deck-slide"><Roadmap /></section>
    <section class="deck-slide"><Team /></section>
    <section class="deck-slide"><PSB /></section>
    <section class="deck-slide"><Final /></section>
  </div>
</template>

<style>
.deck-stack {
  position: relative;
}

.deck-slide {
  position: relative;
  block-size: 100vh;
  min-block-size: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.deck-slide--solution {
  overflow: hidden;
}
</style>
