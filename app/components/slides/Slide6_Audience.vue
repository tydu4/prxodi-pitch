<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

type AudienceProfile = {
  id: number
  label: string
  title: string
  description: string
  tags: string[]
  pains: string[]
}

const profiles: AudienceProfile[] = [
  {
    id: 1,
    label: 'Профиль 1',
    title: 'Активный горожанин',
    description:
      'Ему скучно сидеть дома. Он хочет знать всё: от секретной выставки в подвале до большого концерта. Наш сервис экономит ему 2 часа поиска в день.',
    tags: ['Techno', 'Art', 'Street Food', 'Afterwork'],
    pains: [
      'События разбросаны по десяткам каналов и чатов.',
      'Постоянный страх пропустить что-то важное.',
      'Каждый вечер уходит время на бесконечный поиск.',
    ],
  },
  {
    id: 2,
    label: 'Профиль 2',
    title: 'Новичок в городе',
    description:
      'Студент или специалист, который только переехал. У него нет связей. Мы даем ему не просто афишу, а поиск единомышленников — способ найти своих людей за один вечер.',
    tags: ['Coffee', 'Networking', 'Buddy', 'City Walks'],
    pains: [
      'Нет близкого круга и личных рекомендаций в новом городе.',
      'Сложно решиться пойти на событие в одиночку.',
      'Нужен быстрый вход в комьюнити без неловкости.',
    ],
  },
  {
    id: 3,
    label: 'Профиль 3',
    title: 'Организатор-профи',
    description:
      'Ему нужна лояльная аудитория без рекламных бюджетов корпораций. Мы даем ему прямой канал связи с ЦА и прозрачную аналитику спроса.',
    tags: ['Community', 'Launch', 'Analytics', 'Retention'],
    pains: [
      'Рекламные бюджеты съедают маржу мероприятий.',
      'Трудно возвращать аудиторию на следующие события.',
      'Нужна прозрачная аналитика спроса и сегментов ЦА.',
    ],
  },
]

const root = ref<HTMLElement | null>(null)
const expanded = ref(false)
const reducedMotion = ref(false)

const cardRefs = ref<Array<HTMLElement | null>>([])
const tagRefs = ref<Array<HTMLElement | null>>([])
const painRefs = ref<Array<HTMLElement | null>>([])

let ctx: gsap.Context | null = null
let deepTrigger: ScrollTrigger | null = null

const setCardRef = (el: unknown, index: number) => {
  cardRefs.value[index] = el instanceof HTMLElement ? el : null
}

const setTagRef = (el: unknown, index: number) => {
  tagRefs.value[index] = el instanceof HTMLElement ? el : null
}

const setPainRef = (el: unknown, index: number) => {
  painRefs.value[index] = el instanceof HTMLElement ? el : null
}

const getCards = () => cardRefs.value.filter((item): item is HTMLElement => item instanceof HTMLElement)
const getTagClouds = () => tagRefs.value.filter((item): item is HTMLElement => item instanceof HTMLElement)
const getPainBlocks = () => painRefs.value.filter((item): item is HTMLElement => item instanceof HTMLElement)

const animateExpansion = (isOpen: boolean) => {
  if (reducedMotion.value) {
    return
  }

  const cards = getCards()
  const pains = getPainBlocks()

  if (!cards.length) {
    return
  }

  gsap.killTweensOf(cards)
  gsap.killTweensOf(pains)

  if (isOpen) {
    gsap.to(cards, {
      x: (index) => {
        if (index === 0) {
          return -20
        }

        if (index === cards.length - 1) {
          return 20
        }

        return 0
      },
      y: (index) => (index === 1 ? -16 : 8),
      rotate: (index) => {
        if (index === 0) {
          return -1.2
        }

        if (index === cards.length - 1) {
          return 1.2
        }

        return 0
      },
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(pains, {
      height: 'auto',
      autoAlpha: 1,
      marginTop: '0.95rem',
      duration: 0.44,
      stagger: 0.08,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    return
  }

  gsap.to(cards, {
    x: 0,
    y: 0,
    rotate: 0,
    duration: 0.45,
    ease: 'power2.inOut',
    overwrite: 'auto',
  })

  gsap.to(pains, {
    height: 0,
    autoAlpha: 0,
    marginTop: 0,
    duration: 0.34,
    stagger: {
      each: 0.05,
      from: 'end',
    },
    ease: 'power2.inOut',
    overwrite: 'auto',
  })
}

const setExpanded = (value: boolean) => {
  if (expanded.value === value) {
    return
  }

  expanded.value = value
  animateExpansion(value)
}

const toggleExpanded = () => {
  setExpanded(!expanded.value)
}

const showTags = (index: number) => {
  const cloud = tagRefs.value[index]
  if (!(cloud instanceof HTMLElement)) {
    return
  }

  if (reducedMotion.value) {
    cloud.style.opacity = '1'
    cloud.style.transform = 'translateY(0) scale(1)'
    return
  }

  gsap.killTweensOf(cloud)
  gsap.to(cloud, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration: 0.28,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

const hideTags = (index: number) => {
  const cloud = tagRefs.value[index]
  if (!(cloud instanceof HTMLElement)) {
    return
  }

  if (reducedMotion.value) {
    cloud.style.opacity = '0'
    cloud.style.transform = 'translateY(10px) scale(0.92)'
    return
  }

  gsap.killTweensOf(cloud)
  gsap.to(cloud, {
    autoAlpha: 0,
    y: 12,
    scale: 0.9,
    duration: 0.24,
    ease: 'power2.in',
    overwrite: 'auto',
  })
}

onMounted(() => {
  if (!root.value) {
    return
  }

  reducedMotion.value =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('print').matches

  ctx = gsap.context(() => {
    const cards = getCards()
    const clouds = getTagClouds()
    const pains = getPainBlocks()

    if (!cards.length) {
      return
    }

    if (reducedMotion.value) {
      clouds.forEach((cloud) => {
        cloud.style.opacity = '0'
        cloud.style.transform = 'translateY(10px) scale(0.92)'
      })

      pains.forEach((pain) => {
        pain.style.height = expanded.value ? 'auto' : '0'
        pain.style.opacity = expanded.value ? '1' : '0'
        pain.style.marginTop = expanded.value ? '0.95rem' : '0'
      })

      return
    }

    gsap.set(clouds, {
      autoAlpha: 0,
      y: 12,
      scale: 0.9,
      transformOrigin: '50% 100%',
    })

    gsap.set(pains, {
      height: 0,
      autoAlpha: 0,
      marginTop: 0,
      overflow: 'hidden',
    })

    gsap.from(cards, {
      y: 30,
      autoAlpha: 0,
      duration: 0.72,
      stagger: 0.14,
      immediateRender: false,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 72%',
        once: true,
      },
    })

    deepTrigger = ScrollTrigger.create({
      trigger: root.value,
      start: 'top 30%',
      end: 'bottom 42%',
      onEnter: () => setExpanded(true),
      onEnterBack: () => setExpanded(true),
    })
  }, root.value)
})

onBeforeUnmount(() => {
  deepTrigger?.kill()
  deepTrigger = null
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    ref="root"
    :class="[
      'audience-slide relative isolate min-h-screen overflow-hidden',
      {
        'audience-slide--expanded': expanded,
        'audience-slide--static': reducedMotion,
      },
    ]"
  >
    <div class="audience-energy pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex min-h-screen w-full max-w-[1700px] flex-col justify-center px-6 py-10 md:px-10 lg:px-14">
      <h2 class="audience-title max-w-[1220px] text-[clamp(1.95rem,4.7vw,5rem)] leading-[0.9] tracking-[-0.04em]">
        Наша ЦА: Люди, живущие в ритме города.
      </h2>
      <p class="audience-subtitle mt-3 max-w-[980px] text-[clamp(0.92rem,1.25vw,1.2rem)]">
        Три жизненных состояния, где мы закрываем боль прямо сейчас.
      </p>

      <div class="cards-grid mt-8">
        <article
          v-for="(profile, index) in profiles"
          :key="profile.id"
          :ref="(el) => setCardRef(el, index)"
          class="audience-card group relative rounded-3xl border border-[--primary]"
          tabindex="0"
          role="button"
          :aria-expanded="expanded ? 'true' : 'false'"
          :aria-label="`${profile.label}: ${profile.title}`"
          @mouseenter="showTags(index)"
          @mouseleave="hideTags(index)"
          @focusin="showTags(index)"
          @focusout="hideTags(index)"
          @click="toggleExpanded"
          @keydown.enter.prevent="toggleExpanded"
          @keydown.space.prevent="toggleExpanded"
        >
          <div :ref="(el) => setTagRef(el, index)" class="tag-cloud" aria-hidden="true">
            <span v-for="tag in profile.tags" :key="tag" class="tag-chip">{{ tag }}</span>
          </div>

          <div class="card-head">
            <div class="avatar-shell" aria-hidden="true">
              <svg v-if="profile.id === 1" class="avatar-svg" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" />
                <circle cx="60" cy="44" r="17" />
                <path d="M30 92c8-16 18-22 30-22s22 6 30 22" />
                <path d="M32 40c6-10 14-14 28-14 15 0 24 4 28 14" />
              </svg>
              <svg v-else-if="profile.id === 2" class="avatar-svg" viewBox="0 0 120 120">
                <rect x="10" y="10" width="100" height="100" rx="50" />
                <circle cx="60" cy="43" r="16" />
                <path d="M28 92c7-15 18-22 32-22 13 0 24 7 32 22" />
                <path d="M24 34c9-8 20-12 36-12 18 0 29 4 36 12" />
              </svg>
              <svg v-else class="avatar-svg" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" />
                <path d="M22 60c8-25 24-34 38-34 15 0 31 9 38 34" />
                <circle cx="60" cy="50" r="15" />
                <path d="M30 94c9-14 18-20 30-20s21 6 30 20" />
              </svg>
            </div>

            <div>
              <p class="profile-label">{{ profile.label }}</p>
              <h3 class="profile-title">{{ profile.title }}</h3>
            </div>
          </div>

          <p class="profile-description">{{ profile.description }}</p>

          <div :ref="(el) => setPainRef(el, index)" class="pain-points">
            <p class="pain-title">Pain points</p>
            <ul class="pain-list">
              <li v-for="pain in profile.pains" :key="pain">{{ pain }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.audience-slide {
  --surface: var(--bg-color, var(--bg-surface));
  --ink: var(--text-color, var(--fg));
  background: var(--surface);
  color: var(--ink);
}

.audience-energy {
  background:
    radial-gradient(circle at 12% 24%, color-mix(in srgb, var(--primary) 24%, transparent) 0%, transparent 43%),
    radial-gradient(circle at 88% 76%, color-mix(in srgb, var(--secondary) 24%, transparent) 0%, transparent 42%),
    linear-gradient(to right, color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--ink) 8%, transparent) 1px, transparent 1px);
  background-size: auto, auto, 46px 46px, 46px 46px;
}

.audience-kicker {
  color: color-mix(in srgb, var(--primary) 60%, var(--secondary) 40%);
}

.audience-title {
  color: color-mix(in srgb, var(--ink) 92%, var(--primary) 8%);
}

.audience-subtitle {
  color: color-mix(in srgb, var(--ink) 76%, var(--secondary) 24%);
}

.cards-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.audience-card {
  isolation: isolate;
  display: grid;
  align-content: start;
  gap: 0.85rem;
  min-block-size: clamp(360px, 38vw, 470px);
  padding: clamp(1rem, 1.95vw, 1.4rem);
  cursor: pointer;
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--surface) 94%, var(--primary) 6%),
    color-mix(in srgb, var(--surface) 92%, var(--secondary) 8%)
  );
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 0 40px color-mix(in srgb, var(--secondary) 20%, transparent);
}

.audience-card:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--primary) 50%, var(--secondary) 50%);
  outline-offset: 4px;
}

.tag-cloud {
  position: absolute;
  inset-inline: 0;
  inset-block-start: -1.2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.32rem;
  padding-inline: 0.8rem;
  pointer-events: none;
  z-index: -1;
}

.tag-chip {
  border: 1px solid color-mix(in srgb, var(--primary) 56%, var(--secondary) 44%);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 80%, var(--primary) 20%);
  color: color-mix(in srgb, var(--ink) 80%, var(--primary) 20%);
  padding: 0.2rem 0.5rem;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-head {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
}

.avatar-shell {
  inline-size: clamp(64px, 7vw, 86px);
  block-size: clamp(64px, 7vw, 86px);
  border-radius: 999px;
  border: 3px solid var(--primary);
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 22%, var(--surface) 78%), color-mix(in srgb, var(--secondary) 20%, var(--surface) 80%));
  color: color-mix(in srgb, var(--ink) 22%, var(--primary) 78%);
  display: grid;
  place-items: center;
}

.avatar-svg {
  inline-size: 84%;
  block-size: 84%;
}

.avatar-svg circle,
.avatar-svg rect,
.avatar-svg path {
  fill: none;
  stroke: currentcolor;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.profile-label {
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 66%, var(--secondary) 34%);
}

.profile-title {
  margin-top: 0.25rem;
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(1.44rem, 2.1vw, 2.24rem);
  line-height: 0.92;
  letter-spacing: -0.03em;
  color: color-mix(in srgb, var(--ink) 90%, var(--primary) 10%);
}

.profile-description {
  margin: 0;
  font-size: clamp(0.9rem, 1.1vw, 1.04rem);
  line-height: 1.36;
  color: color-mix(in srgb, var(--ink) 80%, var(--primary) 20%);
}

.pain-points {
  margin-top: 0;
  overflow: hidden;
}

.pain-title {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 70%, var(--secondary) 30%);
}

.pain-list {
  margin-top: 0.56rem;
  display: grid;
  gap: 0.42rem;
}

.pain-list li {
  border: 1px solid color-mix(in srgb, var(--primary) 40%, transparent);
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--surface) 90%, var(--secondary) 10%);
  font-size: clamp(0.78rem, 0.96vw, 0.9rem);
  line-height: 1.3;
  color: color-mix(in srgb, var(--ink) 76%, var(--secondary) 24%);
  padding: 0.45rem 0.5rem;
}

.audience-slide--expanded.audience-slide--static .audience-card:nth-child(1) {
  transform: translate(-14px, 6px) rotate(-0.8deg);
}

.audience-slide--expanded.audience-slide--static .audience-card:nth-child(2) {
  transform: translateY(-12px);
}

.audience-slide--expanded.audience-slide--static .audience-card:nth-child(3) {
  transform: translate(14px, 6px) rotate(0.8deg);
}

.audience-slide--expanded.audience-slide--static .pain-points {
  height: auto;
  opacity: 1;
  margin-top: 0.95rem;
}

@media (min-width: 980px) {
  .cards-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.05rem;
  }
}


</style>
