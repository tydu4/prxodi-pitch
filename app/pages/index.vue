<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import Slide1Hero from '~/components/slides/Slide1_Hero.vue'
import Slide2Problem from '~/components/slides/Slide2_Problem.vue'
import Slide3Solution from '~/components/slides/Slide3_Solution.vue'
import Slide_Ecosystem from '~/components/slides/Slide_Ecosystem.vue'
import Slide4Advantage from '~/components/slides/Slide4_Advantage.vue'
import Slide5Market from '~/components/slides/Slide5_Market.vue'
import Slide6_Audience from '~/components/slides/Slide6_Audience.vue'
import Slide7Business from '~/components/slides/Slide7_Business.vue'
import Slide8_General from '~/components/slides/Slide8.vue'
import Slide8_PSB from '~/components/slides/Slide8_PSB.vue'
import Slide9_Team from '~/components/slides/Slide9_Team.vue'
import Slide10Final from '~/components/slides/Slide10_Final.vue'

const { isPSBMode } = usePresentationMode()
let wheelLock = false
let wheelLockTimer = 0
let wheelAccum = 0
let scrollSnapTimer = 0
let programmaticUntil = 0
let touchStartY = 0
let lastScrollY = 0
let scrollAccum = 0

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

const scrollToSlide = (targetIndex: number) => {
  const slideCount = document.querySelectorAll('.deck-slide').length
  if (!slideCount) {
    return
  }

  const clampedIndex = Math.max(0, Math.min(targetIndex, slideCount - 1))
  const targetY = clampedIndex * window.innerHeight
  const lenis = getLenis()
  programmaticUntil = Date.now() + 950

  if (lenis) {
    lenis.scrollTo(targetY, { duration: 0.95 })
    window.setTimeout(() => {
      if (Math.abs(window.scrollY - targetY) > 8) {
        window.scrollTo({ top: targetY, behavior: 'smooth' })
      }
    }, 60)
    return
  }

  window.scrollTo({ top: targetY, behavior: 'smooth' })
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
    scrollAccum = 0
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

const onDeckScroll = () => {
  if (Date.now() < programmaticUntil) {
    lastScrollY = window.scrollY
    return
  }

  const currentY = window.scrollY
  const delta = currentY - lastScrollY
  lastScrollY = currentY

  if (Math.abs(delta) < 0.5) {
    return
  }

  scrollAccum += delta
  if (Math.abs(scrollAccum) < 18) {
    return
  }

  if (scrollSnapTimer) {
    window.clearTimeout(scrollSnapTimer)
  }

  scrollSnapTimer = window.setTimeout(() => {
    triggerDirection(scrollAccum > 0 ? 1 : -1)
    scrollAccum = 0
  }, 90)
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
  lastScrollY = window.scrollY
  window.addEventListener('keydown', onDeckKeyDown)
  window.addEventListener('wheel', onDeckWheel, { passive: false, capture: true })
  window.addEventListener('scroll', onDeckScroll, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
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
  scrollAccum = 0
  lastScrollY = 0
  wheelLock = false
})
</script>

<template>
  <div class="deck-stack">
    <section class="deck-slide"><Slide1Hero /></section>
    <section class="deck-slide"><Slide2Problem /></section>
    <section class="deck-slide deck-slide--solution"><Slide3Solution /></section>
    <section class="deck-slide"><Slide_Ecosystem /></section>
    <section class="deck-slide"><Slide4Advantage /></section>
    <section class="deck-slide"><Slide5Market /></section>
    <section class="deck-slide"><Slide6_Audience /></section>
    <section class="deck-slide"><Slide7Business /></section>
    <section class="deck-slide">
      <div class="relative perspective-1000 w-full h-screen">
        <div
          class="relative w-full h-full transform-style-3d transition-transform duration-1000"
          :class="{ 'rotate-y-180': isPSBMode }"
        >
          <div class="absolute inset-0 backface-hidden">
            <Slide8_General />
          </div>
          <div class="absolute inset-0 backface-hidden rotate-y-180">
            <Slide8_PSB />
          </div>
        </div>
      </div>
    </section>
    <section class="deck-slide"><Slide9_Team /></section>
    <section class="deck-slide"><Slide10Final /></section>
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
