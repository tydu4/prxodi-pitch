<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

type SpamCard = {
  id: number
  source: string
  text: string
  time: string
}

type CardState = {
  el: HTMLElement
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  angle: number
  spin: number
  targetX: number
  targetY: number
}

const channels = ['Telegram-чат', 'VK паблик', 'Городской канал', 'Локальный форум', 'Районное сообщество']

const messages = [
  'Билеты проданы вчера',
  'Событие отменено в чате',
  'Реклама ставок в афише',
  'Неактуальная локация',
]
const spamCards: SpamCard[] = Array.from({ length: 42 }, (_, index) => ({
  id: index + 1,
  source: channels[index % channels.length]!,
  text: messages[index % messages.length]!,
  time: `${String(8 + ((index * 3) % 15)).padStart(2, '0')}:${String((index * 7) % 60).padStart(2, '0')}`,
}))

const root = ref<HTMLElement | null>(null)
const field = ref<HTMLElement | null>(null)
const heroBox = ref<HTMLElement | null>(null)

const pointer = {
  x: 0,
  y: 0,
  active: false,
}

const bounds = {
  width: 0,
  height: 0,
}

const safeZone = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

const cardStates: CardState[] = []

let ctx: gsap.Context | null = null
let introTrigger: ScrollTrigger | null = null
let introTimeline: gsap.core.Timeline | null = null
let tickerHandler: (() => void) | null = null
let resizeHandler: (() => void) | null = null
let isIntroDone = false

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const collidesWithSafeZone = (x: number, y: number, w: number, h: number) =>
  x < safeZone.x + safeZone.width &&
  x + w > safeZone.x &&
  y < safeZone.y + safeZone.height &&
  y + h > safeZone.y

const updateBounds = () => {
  if (!field.value) {
    return
  }

  const fieldRect = field.value.getBoundingClientRect()
  bounds.width = fieldRect.width
  bounds.height = fieldRect.height

  if (heroBox.value) {
    const heroRect = heroBox.value.getBoundingClientRect()
    safeZone.x = heroRect.left - fieldRect.left - 72
    safeZone.y = heroRect.top - fieldRect.top - 56
    safeZone.width = heroRect.width + 144
    safeZone.height = heroRect.height + 112
    return
  }

  safeZone.width = bounds.width * 0.42
  safeZone.height = bounds.height * 0.28
  safeZone.x = (bounds.width - safeZone.width) * 0.5
  safeZone.y = (bounds.height - safeZone.height) * 0.5
}

const assignScatterTarget = (state: CardState) => {
  const maxX = Math.max(0, bounds.width - state.w)
  const maxY = Math.max(0, bounds.height - state.h)

  let attempts = 0
  do {
    state.targetX = gsap.utils.random(0, maxX)
    state.targetY = gsap.utils.random(0, maxY)
    attempts += 1
  } while (collidesWithSafeZone(state.targetX, state.targetY, state.w, state.h) && attempts < 80)
}

const syncStateFromElement = (state: CardState) => {
  state.x = Number(gsap.getProperty(state.el, 'x'))
  state.y = Number(gsap.getProperty(state.el, 'y'))
  state.angle = Number(gsap.getProperty(state.el, 'rotation'))
}

const startBrownianTicker = () => {
  if (tickerHandler) {
    return
  }

  tickerHandler = () => {
    if (!isIntroDone || !bounds.width || !bounds.height) {
      return
    }

    const frame = gsap.ticker.deltaRatio(60)
    const repulsionRadius = Math.max(170, Math.min(bounds.width, bounds.height) * 0.18)
    const safeCenterX = safeZone.x + safeZone.width * 0.5
    const safeCenterY = safeZone.y + safeZone.height * 0.5

    for (const state of cardStates) {
      state.vx += gsap.utils.random(-0.22, 0.22) * frame
      state.vy += gsap.utils.random(-0.18, 0.18) * frame

      if (pointer.active) {
        const centerX = state.x + state.w * 0.5
        const centerY = state.y + state.h * 0.5
        const dx = centerX - pointer.x
        const dy = centerY - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001

        if (distance < repulsionRadius) {
          const force = (1 - distance / repulsionRadius) * 3.4 * frame
          state.vx += (dx / distance) * force
          state.vy += (dy / distance) * force
        }
      }

      if (collidesWithSafeZone(state.x, state.y, state.w, state.h)) {
        const centerX = state.x + state.w * 0.5
        const centerY = state.y + state.h * 0.5
        const dx = centerX - safeCenterX
        const dy = centerY - safeCenterY
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001
        state.vx += (dx / distance) * 1.8 * frame
        state.vy += (dy / distance) * 1.8 * frame
      }

      state.vx *= 0.94
      state.vy *= 0.94

      const speed = Math.sqrt(state.vx * state.vx + state.vy * state.vy)
      if (speed > 3.8) {
        state.vx = (state.vx / speed) * 3.8
        state.vy = (state.vy / speed) * 3.8
      }

      state.x += state.vx * frame
      state.y += state.vy * frame

      const minX = -12
      const maxX = bounds.width - state.w + 12
      const minY = -12
      const maxY = bounds.height - state.h + 12

      if (state.x < minX) {
        state.x = minX
        state.vx = Math.abs(state.vx) * 0.72
      } else if (state.x > maxX) {
        state.x = maxX
        state.vx = -Math.abs(state.vx) * 0.72
      }

      if (state.y < minY) {
        state.y = minY
        state.vy = Math.abs(state.vy) * 0.72
      } else if (state.y > maxY) {
        state.y = maxY
        state.vy = -Math.abs(state.vy) * 0.72
      }

      state.spin = clamp(state.spin + gsap.utils.random(-0.006, 0.006) * frame, -0.14, 0.14)
      state.angle = clamp(state.angle + (state.spin + state.vx * 0.04) * frame, -14, 14)

      gsap.set(state.el, {
        x: state.x,
        y: state.y,
        rotation: state.angle,
      })
    }
  }

  gsap.ticker.add(tickerHandler)
}

const playRainIntro = () => {
  if (isIntroDone || !cardStates.length) {
    return
  }

  introTimeline?.kill()
  introTimeline = gsap.timeline({
    onComplete: () => {
      for (const state of cardStates) {
        syncStateFromElement(state)
        state.vx = gsap.utils.random(-1.6, 1.6)
        state.vy = gsap.utils.random(-1.2, 1.2)
      }

      isIntroDone = true
      startBrownianTicker()
    },
  })

  cardStates.forEach((state, index) => {
    const impactY = state.targetY + gsap.utils.random(18, 62)

    introTimeline!.to(
      state.el,
      {
        keyframes: [
          {
            x: state.targetX + gsap.utils.random(-16, 16),
            y: impactY,
            rotation: gsap.utils.random(-12, 12),
            duration: gsap.utils.random(0.42, 0.8),
            ease: 'power4.in',
          },
          {
            x: state.targetX,
            y: state.targetY,
            rotation: gsap.utils.random(-7, 7),
            duration: gsap.utils.random(0.22, 0.36),
            ease: 'power2.out',
          },
        ],
      },
      index * 0.022,
    )
  })
}

const onPointerMove = (event: PointerEvent) => {
  if (!field.value) {
    return
  }

  const rect = field.value.getBoundingClientRect()
  pointer.x = event.clientX - rect.left
  pointer.y = event.clientY - rect.top
  pointer.active = true
}

const onPointerLeave = () => {
  pointer.active = false
}

onMounted(() => {
  if (!root.value || !field.value) {
    return
  }

  const rootEl = root.value

  ctx = gsap.context(() => {
    const nodes = gsap.utils.toArray<HTMLElement>('.noise-card')
    updateBounds()
    cardStates.length = 0

    for (const node of nodes) {
      const state: CardState = {
        el: node,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        w: node.offsetWidth || 190,
        h: node.offsetHeight || 88,
        angle: gsap.utils.random(-14, 14),
        spin: gsap.utils.random(-0.1, 0.1),
        targetX: 0,
        targetY: 0,
      }

      assignScatterTarget(state)

      const startX = state.targetX + gsap.utils.random(-90, 90)
      const startY = -state.h - gsap.utils.random(110, bounds.height * 0.95)

      gsap.set(node, {
        x: startX,
        y: startY,
        rotation: state.angle,
        autoAlpha: 0.92,
      })

      state.x = startX
      state.y = startY
      cardStates.push(state)
    }

    introTrigger = ScrollTrigger.create({
      trigger: rootEl,
      start: 'top 82%',
      once: true,
      onEnter: playRainIntro,
    })

    if (rootEl.getBoundingClientRect().top < window.innerHeight * 0.88) {
      playRainIntro()
    }

    resizeHandler = () => {
      updateBounds()

      for (const state of cardStates) {
        state.w = state.el.offsetWidth || state.w
        state.h = state.el.offsetHeight || state.h
        assignScatterTarget(state)

        if (isIntroDone) {
          state.x = clamp(state.x, -12, bounds.width - state.w + 12)
          state.y = clamp(state.y, -12, bounds.height - state.h + 12)

          if (collidesWithSafeZone(state.x, state.y, state.w, state.h)) {
            state.x = state.targetX
            state.y = state.targetY
          }

          gsap.set(state.el, { x: state.x, y: state.y })
          continue
        }

        gsap.set(state.el, {
          x: state.targetX + gsap.utils.random(-90, 90),
          y: -state.h - gsap.utils.random(110, bounds.height * 0.95),
        })
      }
    }

    window.addEventListener('resize', resizeHandler)
  }, rootEl)
})

onBeforeUnmount(() => {
  pointer.active = false

  if (tickerHandler) {
    gsap.ticker.remove(tickerHandler)
    tickerHandler = null
  }

  introTrigger?.kill()
  introTrigger = null

  introTimeline?.kill()
  introTimeline = null

  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }

  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    ref="root"
    class="problem-slide relative isolate min-h-screen overflow-hidden"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="noise-backdrop absolute inset-0 z-0" aria-hidden="true" />

    <div ref="field" class="noise-field pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      <article v-for="card in spamCards" :key="card.id" class="noise-card">
        <p class="noise-card-meta">
          <span>{{ card.source }}</span>
          <span>{{ card.time }}</span>
        </p>
        <p class="noise-card-text">{{ card.text }}</p>
      </article>
    </div>

    <div class="relative z-20 flex min-h-screen items-center justify-center px-6 py-10 md:px-10">
      <div
        ref="heroBox"
        class="problem-hero rounded-3xl border border-[--primary] shadow-xl backdrop-blur-md"
      >
        <h2 class="problem-title text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Хаос в данных убивает городскую среду</h2>
        <div class="problem-copy">
          <p>
            В городах с населением до 1 млн человек более 70% событий проходят мимо крупных агрегаторов.
            Информация разрознена: она гниет в закрытых чатах, анонимных пабликах и на устаревших сайтах.
          </p>
          <p>
            Пользователь тратит в среднем 40 минут на поиск досуга и в итоге остается дома. Это упущенная выгода для
            бизнеса и стагнация для города.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-slide {
  --bg-color: var(--bg-surface);
  --text-color: var(--fg);
  min-block-size: 100dvh;
  background: var(--bg-color);
  color: var(--text-color);
}

.noise-backdrop {
  background:
    radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--secondary) 20%, transparent) 0%, transparent 42%),
    radial-gradient(circle at 86% 78%, color-mix(in srgb, var(--primary) 19%, transparent) 0%, transparent 44%),
    linear-gradient(to right, color-mix(in srgb, var(--text-color) 8%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--text-color) 8%, transparent) 1px, transparent 1px);
  background-size: auto, auto, 42px 42px, 42px 42px;
}

.noise-field {
  overflow: hidden;
}

.noise-card {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: clamp(148px, 16.4vw, 232px);
  min-block-size: 70px;
  border: 2px solid color-mix(in srgb, var(--text-color) 18%, transparent);
  border-radius: 1.5rem;
  padding: 0.56rem 0.72rem 0.62rem;
  background: color-mix(in srgb, var(--bg-color) 86%, var(--text-color) 14%);
  color: color-mix(in srgb, var(--text-color) 64%, var(--bg-color) 36%);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 34px color-mix(in srgb, var(--secondary) 14%, transparent);
  filter: grayscale(1) saturate(0.06) contrast(0.95);
  opacity: 0.84;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.noise-card::after {
  content: '';
  position: absolute;
  inset-block-end: -9px;
  inset-inline-start: 16px;
  inline-size: 18px;
  block-size: 12px;
  border-inline-start: 2px solid color-mix(in srgb, var(--text-color) 18%, transparent);
  border-block-end: 2px solid color-mix(in srgb, var(--text-color) 18%, transparent);
  background: color-mix(in srgb, var(--bg-color) 86%, var(--text-color) 14%);
  clip-path: polygon(0 0, 100% 0, 0 100%);
}

.noise-card:nth-child(3n) {
  inline-size: clamp(136px, 15vw, 214px);
}

.noise-card:nth-child(5n) {
  opacity: 0.7;
}

.noise-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  font-size: 0.56rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
}

.noise-card-text {
  margin-block-start: 0.34rem;
  font-size: clamp(0.76rem, 0.82vw, 0.92rem);
  line-height: 1.2;
  font-weight: 700;
}

.problem-hero {
  position: relative;
  z-index: 2;
  inline-size: min(92vw, 980px);
  padding: clamp(1.35rem, 2.8vw, 2.5rem);
  background: color-mix(in srgb, var(--bg-color) 82%, transparent);
  backdrop-filter: blur(14px);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
  text-align: left;
}

.problem-kicker {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.problem-title {
  margin-block-start: 0.65rem;
  font-size: clamp(1.7rem, 4.3vw, 3.55rem);
  line-height: 0.96;
  letter-spacing: -0.03em;
  text-transform: none;
}

.problem-copy {
  margin-block-start: 0.82rem;
}

.problem-copy p {
  font-size: clamp(0.96rem, 1.22vw, 1.2rem);
  line-height: 1.46;
  font-weight: 500;
  color: var(--text-color);
}

.problem-copy p + p {
  margin-top: 0.78rem;
}

@media (max-width: 920px) {
  .noise-card {
    inline-size: clamp(124px, 23vw, 184px);
    min-block-size: 62px;
    padding: 0.48rem 0.62rem 0.54rem;
  }

  .problem-hero {
    inline-size: min(94vw, 860px);
    padding: clamp(1.2rem, 4.2vw, 1.7rem);
  }
}

</style>

