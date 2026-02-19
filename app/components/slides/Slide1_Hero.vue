<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

gsap.registerPlugin(ScrollTrigger)

type PortalCard = {
  id: number
  src: string
  x: number
  y: number
  zStart: number
  rotation: number
  tiltX: number
  scale: number
  duration: number
  offset: number
}

const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)

const images = import.meta.glob('../../assets/img/*.jpg', { eager: true })

const tunnelCards: PortalCard[] = Array.from({ length: 20 }, (_, index) => {
  const ring = Math.floor(index / 5) + 1
  const angle = (index / 20) * Math.PI * 4
  const radius = 120 + ring * 92 + (index % 3) * 24

  const imageIndex = (index % 10) + 1
  const imagePath = `../../assets/img/${imageIndex}.jpg`
  const imgSrc = (images[imagePath] as { default: string })?.default ?? ''

  return {
    id: index + 1,
    src: imgSrc,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius * 0.66,
    zStart: -3200 - index * 130,
    rotation: ((index * 17) % 28) - 14,
    tiltX: ((index % 7) - 3) * 2,
    scale: 0.78 + (index % 5) * 0.05,
    duration: 8.2 + (index % 6) * 0.45,
    offset: (index * 0.083) % 1,
  }
})

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) {
    return
  }

  ctx = gsap.context(() => {
    const cardNodes = gsap.utils.toArray<HTMLElement>('.portal-card')
    const tunnelTweens: gsap.core.Tween[] = []

    cardNodes.forEach((node, index) => {
      const card = tunnelCards[index]
      if (!card) {
        return
      }

      gsap.set(node, {
        xPercent: -50,
        yPercent: -50,
        x: card.x,
        y: card.y,
        z: card.zStart,
        rotation: card.rotation,
        rotationX: card.tiltX,
        scale: card.scale,
        transformOrigin: '50% 50%',
      })

      const travel = gsap.to(node, {
        z: 620,
        duration: card.duration,
        repeat: -1,
        ease: 'none',
      })
      travel.progress(card.offset)
      tunnelTweens.push(travel)
    })

    const applyTunnelSpeed = (speed: number) => {
      tunnelTweens.forEach((tween) => tween.timeScale(speed))
    }

    const speedProxy = { value: 1 }
    const toSpeed = gsap.quickTo(speedProxy, 'value', {
      duration: 0.22,
      ease: 'power2.out',
      onUpdate: () => applyTunnelSpeed(speedProxy.value),
    })
    applyTunnelSpeed(1)

    if (title.value && stage.value) {
      const intro = gsap.timeline()

      intro.fromTo(
        title.value,
        {
          scale: 10,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.92,
          ease: 'expo.out',
          transformOrigin: '50% 50%',
        },
      )

      intro.to(
        stage.value,
        {
          keyframes: [
            { x: -18, y: 11 },
            { x: 15, y: -9 },
            { x: -9, y: 5 },
            { x: 5, y: -3 },
            { x: 0, y: 0 },
          ],
          duration: 0.34,
          ease: 'power1.inOut',
        },
        '-=0.23',
      )
    }

    ScrollTrigger.create({
      trigger: root.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        toSpeed(1 + self.progress * 4.6)
      },
      onLeave: () => toSpeed(1),
      onLeaveBack: () => toSpeed(1),
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="portal-slide relative isolate min-h-screen overflow-hidden">
    <div class="portal-backdrop absolute inset-0 z-0" aria-hidden="true" />

    <div class="portal-tunnel absolute inset-0 z-0" aria-hidden="true">
      <div class="portal-tunnel-stage">
        <article
          v-for="card in tunnelCards"
          :key="card.id"
          class="portal-card"
          :style="{ '--card-hue': `${card.id * 7}deg` }"
        >
          <img
            :src="card.src"
            :alt="`Event poster ${card.id}`"
            loading="lazy"
            decoding="async"
          >
        </article>
      </div>
    </div>

    <div class="print-shape absolute inset-0 z-0" aria-hidden="true" />

    <div
      ref="stage"
      class="portal-content relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col items-center justify-center px-6 py-14 text-center md:px-10 lg:px-16"
    >
      <h1 ref="title" class="portal-title">
        ПРИХОДИ
      </h1>

      <p class="portal-note mt-9">умный агрегатор мероприятий</p>
    </div>
  </section>
</template>

<style scoped>
.portal-slide {
  --bg-color: var(--bg-surface);
  --text-color: var(--fg);
  min-block-size: 100dvh;
  background: var(--bg-color);
  color: var(--text-color);
}

.portal-backdrop {
  background:
    radial-gradient(circle at 22% 28%, color-mix(in srgb, var(--primary) 24%, transparent) 0%, transparent 44%),
    radial-gradient(circle at 78% 72%, color-mix(in srgb, var(--secondary) 22%, transparent) 0%, transparent 46%),
    linear-gradient(to right, color-mix(in srgb, var(--text-color) 8%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--text-color) 8%, transparent) 1px, transparent 1px);
  background-size: auto, auto, 48px 48px, 48px 48px;
}

.portal-tunnel {
  overflow: hidden;
  perspective: 1500px;
  pointer-events: none;
}

.portal-tunnel-stage {
  position: absolute;
  inset: -18%;
  transform-style: preserve-3d;
  transform: rotateX(13deg);
}

.portal-card {
  position: absolute;
  top: 50%;
  left: 50%;
  inline-size: clamp(132px, 14vw, 210px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 2px solid var(--primary);
  border-radius: 1.5rem;
  background: color-mix(in srgb, var(--bg-color) 88%, var(--primary) 12%);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
  will-change: transform;
}

.portal-card img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  filter: saturate(126%) contrast(112%) hue-rotate(var(--card-hue));
}

.portal-content {
  pointer-events: none;
}

.portal-title {
  margin: 0;
  font-family: 'Archivo Black', 'Sora', sans-serif;
  font-size: clamp(3.4rem, 19vw, 15rem);
  line-height: 0.8;
  letter-spacing: -0.07em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--text-color) 90%, var(--bg-color) 10%);
  -webkit-text-stroke: clamp(2px, 0.2vw, 5px) color-mix(in srgb, var(--bg-color) 74%, var(--primary) 26%);
  text-shadow: 0 22px 38px color-mix(in srgb, var(--secondary) 24%, transparent);
  user-select: none;
}

.portal-note {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid color-mix(in srgb, var(--primary) 56%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--bg-color) 84%, transparent);
  color: color-mix(in srgb, var(--text-color) 82%, var(--secondary) 18%);
  font-size: clamp(0.66rem, 1vw, 0.84rem);
  font-family: 'IBM Plex Mono', 'JetBrains Mono', Consolas, 'Courier New', monospace;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.4rem 0.78rem;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 30px color-mix(in srgb, var(--secondary) 18%, transparent);
  backdrop-filter: blur(4px);
}

.print-shape {
  display: none;
}

@media (max-width: 980px) {
  .portal-tunnel-stage {
    transform: rotateX(9deg);
  }

  .portal-card {
    inline-size: clamp(106px, 21vw, 156px);
    border-radius: 1.5rem;
    box-shadow:
      0 20px 50px rgba(0, 0, 0, 0.08),
      0 0 32px color-mix(in srgb, var(--secondary) 16%, transparent);
  }
}

</style>
