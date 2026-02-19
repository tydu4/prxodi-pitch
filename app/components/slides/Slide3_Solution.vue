<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

type PhoneMode = 'feed' | 'map' | 'friend'

type SolutionBlock = {
  title: string
  description: string
  mode: PhoneMode
}

type PerfectEvent = {
  id: number
  title: string
  district: string
  time: string
}

const solutionBlocks: SolutionBlock[] = [
  {
    title: 'Тотальный охват.',
    description:
      'Наша система — это не просто каталог. Это агрессивный поисковый движок, который мониторит сотни неструктурированных источников 24/7. Мы находим то, что пропускают Яндекс.Афиша и Timepad, обеспечивая 100% покрытие города.',
    mode: 'feed',
  },
  {
    title: 'AI-Куратор.',
    description:
      'Больше никаких бесконечных списков. Мы используем векторные рекомендации, чтобы анализировать вайб каждого события и сопоставлять его с психографическим профилем пользователя. Система выдает только то, что «залетит» именно вам.',
    mode: 'map',
  },
  {
    title: 'Социальный капитал.',
    description:
      'Мы решаем проблему одиночества. Интегрированный механизм поиска единомышленников и чаты событий позволяют в один клик найти компанию. Мы переводим пользователя из онлайна в реальное городское сообщество.',
    mode: 'friend',
  },
]

const perfectEvents: PerfectEvent[] = [
  { id: 1, title: 'Sunset Jazz Meetup', district: 'Патрики', time: '19:30' },
  { id: 2, title: 'Tech & Coffee Circle', district: 'Суперметалл', time: '18:45' },
  { id: 3, title: 'Street Art Walk', district: 'Хлебозавод', time: '17:20' },
  { id: 4, title: 'Board Games + Networking', district: 'Депо', time: '20:10' },
  { id: 5, title: 'Urban Photo Hunt', district: 'Бауманская', time: '16:55' },
  { id: 6, title: 'Rooftop Movie Night', district: 'Тверская', time: '21:00' },
]

const feedLoop = [...perfectEvents, ...perfectEvents]

const root = ref<HTMLElement | null>(null)
const phoneShell = ref<HTMLElement | null>(null)
const activeStep = ref(0)
const activeMode = computed<PhoneMode>(() => solutionBlocks[activeStep.value]?.mode ?? 'feed')

let ctx: gsap.Context | null = null
let blockNodes: HTMLElement[] = []
let phoneAutoTimer = 0
const PHONE_ROTATION_MS = 3000

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const animateActiveBlock = (index: number) => {
  if (!blockNodes.length) {
    return
  }

  blockNodes.forEach((node, nodeIndex) => {
    const isActive = nodeIndex === index
    gsap.to(node, {
      y: isActive ? -5 : 0,
      duration: 0.34,
      ease: 'power2.out',
    })
  })
}

const startPhoneAutoRotation = () => {
  if (!import.meta.client) {
    return
  }

  stopPhoneAutoRotation()
  phoneAutoTimer = window.setInterval(() => {
    setActiveStep((activeStep.value + 1) % solutionBlocks.length)
  }, PHONE_ROTATION_MS)
}

const stopPhoneAutoRotation = () => {
  if (!import.meta.client || !phoneAutoTimer) {
    return
  }

  window.clearInterval(phoneAutoTimer)
  phoneAutoTimer = 0
}

const setActiveStep = (index: number) => {
  const boundedIndex = clamp(index, 0, solutionBlocks.length - 1)
  if (boundedIndex === activeStep.value) {
    return
  }

  activeStep.value = boundedIndex
  animateActiveBlock(boundedIndex)
}

const onPointerMove = (event: PointerEvent) => {
  if (!phoneShell.value || !root.value || event.pointerType === 'touch') {
    return
  }

  const rect = root.value.getBoundingClientRect()
  const xRatio = (event.clientX - rect.left) / rect.width - 0.5
  const yRatio = (event.clientY - rect.top) / rect.height - 0.5

  gsap.to(phoneShell.value, {
    rotateY: xRatio * 11,
    rotateX: -yRatio * 10,
    duration: 0.45,
    ease: 'power3.out',
    transformPerspective: 1100,
    transformOrigin: 'center center',
  })
}

const onPointerLeave = () => {
  if (!phoneShell.value) {
    return
  }

  gsap.to(phoneShell.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.6,
    ease: 'power2.out',
  })
}

onMounted(() => {
  if (!root.value) {
    return
  }

  setActiveStep(0)

  ctx = gsap.context(() => {
    blockNodes = gsap.utils.toArray<HTMLElement>('.solution-block')
    gsap.set(blockNodes, { x: 130 })

    gsap.to(blockNodes, {
      x: 0,
      duration: 0.82,
      stagger: 0.16,
      immediateRender: false,
      ease: 'back.out(1.35)',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 74%',
        once: true,
      },
    })

    animateActiveBlock(activeStep.value)
  }, root.value)

  startPhoneAutoRotation()
})

onBeforeUnmount(() => {
  stopPhoneAutoRotation()
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    ref="root"
    class="solution-slide relative isolate h-full overflow-hidden"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="energy-field pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-center px-6 pt-10 pb-6 md:px-12 md:pt-12 md:pb-8 lg:px-16">
      <h2 class="solution-title text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] max-w-[1100px] text-[clamp(1.6rem,3.2vw,3.4rem)] leading-[0.9] tracking-[-0.04em]">
        Smart Events: Интеллектуальная точка входа</h2>

      <div class="solution-layout mt-4 grid gap-5 md:mt-5 lg:grid-cols-5">
        <div class="phone-column lg:col-span-2">
          <div class="phone-stage">
            <article
              ref="phoneShell"
              class="phone-shell border-2 border-[--primary]"
              aria-label="Smart Events intelligence filter preview"
            >
              <div class="phone-notch" aria-hidden="true" />

              <div class="phone-screen">
                <header class="phone-head">
                  <span class="head-pill" :class="{ 'head-pill--active': activeMode === 'feed' }">Лента</span>
                  <span class="head-pill" :class="{ 'head-pill--active': activeMode === 'map' }">Карта</span>
                  <span class="head-pill" :class="{ 'head-pill--active': activeMode === 'friend' }">Профиль</span>
                </header>

                <div class="screen-body">
                  <section class="mode-layer feed-layer" :class="{ 'is-active': activeMode === 'feed' }">
                    <div class="feed-loop">
                      <article v-for="(eventItem, index) in feedLoop" :key="`${eventItem.id}-${index}`" class="event-card">
                        <p class="event-tag">Perfect Event</p>
                        <h3 class="event-title">{{ eventItem.title }}</h3>
                        <p class="event-meta">{{ eventItem.district }} · {{ eventItem.time }}</p>
                      </article>
                    </div>
                  </section>

                  <section class="mode-layer map-layer" :class="{ 'is-active': activeMode === 'map' }">
                    <div class="map-grid" />
                    <span class="map-pin map-pin-a">Джаз</span>
                    <span class="map-pin map-pin-b">Стартапы</span>
                    <span class="map-pin map-pin-c">Кино</span>
                    <span class="map-pin map-pin-d">Арт</span>
                    <div class="map-route" />
                  </section>

                  <section class="mode-layer friend-layer" :class="{ 'is-active': activeMode === 'friend' }">
                    <article class="friend-card">
                      <div class="friend-avatar">AK</div>
                      <div>
                        <p class="friend-name">Алина К.</p>
                        <p class="friend-note">Любит: стендап, маркетплейсы, урбан-туры</p>
                      </div>
                    </article>
                    <div class="friend-list">
                      <p>Общий интерес: Product Talks</p>
                      <p>2 общих мероприятия за месяц</p>
                      <p>Чат события уже активен</p>
                    </div>
                  </section>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="copy-column flex flex-col gap-3 lg:col-span-3">
          <article
            v-for="(block, index) in solutionBlocks"
            :key="block.title"
            class="solution-block rounded-3xl border-2 border-[--primary] shadow-xl"
            :class="{ 'is-active': activeStep === index }"
          >
            <h3 class="block-title">{{ block.title }}</h3>
            <p class="block-description">{{ block.description }}</p>
          </article>
        </div>
      </div>

      <div class="print-grid mt-7">
        <article class="print-shot border-2 border-[--primary]">
          <p class="print-shot-title">Скриншот интерфейса Smart Events</p>
          <div class="print-shot-screen">
            <div class="print-shot-toolbar">
              <span>Лента</span>
              <span>Карта</span>
              <span>Профиль</span>
            </div>
            <div class="print-shot-panels">
              <div class="print-panel">
                <p>Perfect Event</p>
                <p>Sunset Jazz Meetup · 19:30</p>
              </div>
              <div class="print-panel">
                <p>Персональная карта</p>
                <p>4 релевантных зоны рядом</p>
              </div>
              <div class="print-panel">
                <p>Профиль друга</p>
                <p>Совпадение интересов 86%</p>
              </div>
            </div>
          </div>
        </article>

        <article
          v-for="block in solutionBlocks"
          :key="`print-${block.title}`"
          class="solution-block print-block rounded-3xl border-2 border-[--primary] shadow-xl"
        >
          <h3 class="block-title">{{ block.title }}</h3>
          <p class="block-description">{{ block.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution-slide {
  block-size: 100%;
  --surface: var(--bg-color, var(--bg-surface));
  --ink: var(--text-color, var(--fg));
  background: var(--surface);
  color: var(--ink);
}

.energy-field {
  background:
    radial-gradient(circle at 14% 20%, color-mix(in srgb, var(--primary) 24%, transparent) 0%, transparent 42%),
    radial-gradient(circle at 86% 80%, color-mix(in srgb, var(--secondary) 24%, transparent) 0%, transparent 42%),
    linear-gradient(to right, color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px);
  background-size: auto, auto, 46px 46px, 46px 46px;
}

.solution-kicker {
  color: color-mix(in srgb, var(--primary) 58%, var(--secondary) 42%);
}

.solution-layout {
  min-block-size: 0;
  align-items: center;
}

.phone-column {
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-stage {
  inline-size: 100%;
  perspective: 1100px;
}

.phone-shell {
  position: relative;
  inline-size: min(100%, 248px);
  margin-inline: auto;
  aspect-ratio: 9 / 19;
  border-radius: 2.1rem;
  padding: 0.65rem;
  background: color-mix(in srgb, var(--surface) 90%, var(--primary) 10%);
  box-shadow:
    0 28px 50px -32px color-mix(in srgb, var(--primary) 62%, transparent),
    0 20px 44px -30px color-mix(in srgb, var(--secondary) 62%, transparent);
  will-change: transform;
}

.phone-notch {
  position: absolute;
  top: 0.45rem;
  left: 50%;
  transform: translateX(-50%);
  inline-size: 38%;
  block-size: 0.34rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--ink) 78%, var(--primary) 22%);
}

.phone-screen {
  position: relative;
  block-size: 100%;
  border-radius: 1.7rem;
  border: 2px solid color-mix(in srgb, var(--primary) 38%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--primary) 12%, var(--surface) 88%), color-mix(in srgb, var(--secondary) 11%, var(--surface) 89%));
  padding: 0.85rem 0.72rem 0.72rem;
  overflow: hidden;
}

.phone-head {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.32rem;
}

.head-pill {
  border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
  border-radius: 999px;
  text-align: center;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 72%, var(--primary) 28%);
  background: color-mix(in srgb, var(--surface) 94%, var(--primary) 6%);
  padding: 0.34rem 0.2rem;
}

.head-pill--active {
  color: color-mix(in srgb, var(--surface) 92%, var(--primary) 8%);
  background: linear-gradient(120deg, var(--primary), var(--secondary));
  border-color: transparent;
}

.screen-body {
  position: relative;
  margin-top: 0.6rem;
  block-size: calc(100% - 2rem);
  border-radius: 1rem;
  overflow: hidden;
}

.mode-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateX(18px);
  transition:
    opacity 0.42s ease,
    transform 0.42s ease;
  pointer-events: none;
}

.mode-layer.is-active {
  opacity: 1;
  transform: translateX(0);
}

.feed-layer {
  overflow: hidden;
}

.feed-loop {
  display: grid;
  gap: 0.52rem;
  animation: feed-scroll 13s linear infinite;
}

.feed-layer:not(.is-active) .feed-loop {
  animation-play-state: paused;
}

.event-card {
  border: 1px solid color-mix(in srgb, var(--primary) 34%, transparent);
  border-radius: 0.82rem;
  padding: 0.55rem 0.62rem;
  background: color-mix(in srgb, var(--surface) 96%, var(--primary) 4%);
  box-shadow: 0 10px 20px -16px color-mix(in srgb, var(--primary) 64%, transparent);
}

.event-tag {
  inline-size: fit-content;
  border-radius: 999px;
  background: linear-gradient(120deg, var(--primary), var(--secondary));
  color: color-mix(in srgb, var(--surface) 95%, var(--primary) 5%);
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2rem 0.48rem;
}

.event-title {
  margin-top: 0.36rem;
  font-size: 0.78rem;
  line-height: 1.2;
  font-weight: 700;
  color: color-mix(in srgb, var(--ink) 86%, var(--primary) 14%);
}

.event-meta {
  margin-top: 0.22rem;
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 66%, var(--secondary) 34%);
}

.map-layer {
  background:
    linear-gradient(to right, color-mix(in srgb, var(--ink) 11%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--ink) 11%, transparent) 1px, transparent 1px),
    linear-gradient(145deg, color-mix(in srgb, var(--secondary) 14%, var(--surface) 86%), color-mix(in srgb, var(--primary) 14%, var(--surface) 86%));
  background-size: 24px 24px, 24px 24px, auto;
}

.map-grid {
  position: absolute;
  inset: 0;
}

.map-pin {
  position: absolute;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--ink) 22%, transparent);
  background: color-mix(in srgb, var(--surface) 95%, var(--secondary) 5%);
  color: color-mix(in srgb, var(--ink) 80%, var(--secondary) 20%);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.26rem 0.46rem;
}

.map-pin-a {
  top: 20%;
  left: 9%;
}

.map-pin-b {
  top: 40%;
  right: 9%;
}

.map-pin-c {
  bottom: 24%;
  left: 22%;
}

.map-pin-d {
  bottom: 14%;
  right: 22%;
}

.map-route {
  position: absolute;
  inset: 24% 15% 22% 14%;
  border: 2px dashed color-mix(in srgb, var(--primary) 62%, transparent);
  border-radius: 1rem;
}

.friend-layer {
  display: grid;
  gap: 0.62rem;
  padding: 0.08rem;
}

.friend-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.52rem;
  align-items: center;
  border: 1px solid color-mix(in srgb, var(--secondary) 36%, transparent);
  border-radius: 0.85rem;
  padding: 0.64rem;
  background: color-mix(in srgb, var(--surface) 95%, var(--secondary) 5%);
}

.friend-avatar {
  inline-size: 2rem;
  block-size: 2rem;
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, var(--primary) 58%, transparent);
  display: grid;
  place-items: center;
  font-size: 0.62rem;
  font-weight: 800;
  color: color-mix(in srgb, var(--ink) 84%, var(--primary) 16%);
  background: color-mix(in srgb, var(--surface) 90%, var(--primary) 10%);
}

.friend-name {
  font-size: 0.72rem;
  font-weight: 800;
  color: color-mix(in srgb, var(--ink) 86%, var(--secondary) 14%);
}

.friend-note {
  margin-top: 0.16rem;
  font-size: 0.58rem;
  line-height: 1.2;
  color: color-mix(in srgb, var(--ink) 66%, var(--secondary) 34%);
}

.friend-list {
  border: 1px solid color-mix(in srgb, var(--primary) 34%, transparent);
  border-radius: 0.82rem;
  padding: 0.58rem;
  background: color-mix(in srgb, var(--surface) 94%, var(--primary) 6%);
  display: grid;
  gap: 0.34rem;
}

.friend-list p {
  font-size: 0.6rem;
  line-height: 1.25;
  color: color-mix(in srgb, var(--ink) 78%, var(--primary) 22%);
}

.solution-block {
  min-block-size: clamp(8rem, 11vh, 10rem);
  background: color-mix(in srgb, var(--surface) 95%, var(--primary) 5%);
  padding: clamp(0.9rem, 1.6vw, 1.35rem);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    box-shadow 0.3s ease;
}

.solution-block.is-active {
  border-color: var(--secondary);
  background: color-mix(in srgb, var(--surface) 88%, var(--secondary) 12%);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
}

.block-title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(1.05rem, 1.5vw, 1.45rem);
  line-height: 1.03;
  letter-spacing: -0.02em;
  color: var(--text-color, var(--ink));
}

.block-description {
  margin-top: 0.45rem;
  font-size: clamp(0.82rem, 0.88vw, 0.94rem);
  line-height: 1.38;
  color: var(--ink);
}

.print-grid {
  display: none;
}

.print-shot {
  background: color-mix(in srgb, var(--surface) 95%, var(--primary) 5%);
  padding: 0.9rem;
}

.print-shot-title {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 78%, var(--primary) 22%);
}

.print-shot-screen {
  margin-top: 0.68rem;
  border: 2px solid color-mix(in srgb, var(--primary) 30%, transparent);
  border-radius: 0.8rem;
  padding: 0.6rem;
  background: color-mix(in srgb, var(--surface) 94%, var(--secondary) 6%);
}

.print-shot-toolbar {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.3rem;
}

.print-shot-toolbar span {
  border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
  border-radius: 999px;
  padding: 0.2rem 0.22rem;
  text-align: center;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.print-shot-panels {
  margin-top: 0.5rem;
  display: grid;
  gap: 0.35rem;
}

.print-panel {
  border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
  border-radius: 0.5rem;
  padding: 0.36rem 0.42rem;
  font-size: 0.62rem;
  line-height: 1.2;
}

@keyframes feed-scroll {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-50%);
  }
}

@media (max-width: 1023px) {
  .phone-shell {
    inline-size: min(64vw, 260px);
  }
}

@media (max-height: 900px) and (min-width: 1024px) {
  .solution-layout {
    margin-top: 0.8rem;
  }

  .phone-shell {
    inline-size: min(100%, 220px);
  }

  .solution-block {
    min-block-size: 7.2rem;
    padding: 0.85rem;
  }

  .block-title {
    font-size: 1rem;
  }

  .block-description {
    font-size: 0.8rem;
    line-height: 1.3;
  }
}

</style>



