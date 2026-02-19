<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import teamPhoto11 from '~/assets/img/11.jpg'
import teamPhoto12 from '~/assets/img/12.jpg'
import teamPhoto13 from '~/assets/img/13.jpg'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}


const team = [
  { 
    id: 1, 
    role: 'Growth', 
    photo: teamPhoto11,
    name: 'Попов Никита', 
    desc: 'Маркетинг и комьюнити-менеджмент.',
    color: 'var(--psb-blue)'
  },
  { 
    id: 2, 
    role: 'Lead Dev', 
    photo: teamPhoto12,
    name: 'Кривко Матвей',
    desc: 'Архитектура, AI-пайплайн и разработка.',
    color: 'var(--primary)'
  },
  { 
    id: 3, 
    role: 'Product', 
    photo: teamPhoto13,
    name: 'Кашин Даниил', 
    desc: 'Стратегия и работа с партнерами.',
    color: 'var(--psb-orange)' 
  },
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('print').matches) return

  ctx = gsap.context(() => {
    
    // 1. Появление заголовка
    gsap.from('.team-title', {
      y: 50,
      duration: 0.8,
      immediateRender: false,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: root.value, start: 'top 70%' }
    })

    // 2. Карточки вылетают снизу вверх с задержкой
    gsap.from('.team-card', {
      y: 150,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2, // Каждая следующая через 0.2 сек
      immediateRender: false,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.team-grid', start: 'top 80%' }
    })

    // 3. Анимация соединительных линий (Neural Network Background)
    gsap.to('.bg-line', {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: root.value, start: 'top 60%' }
    })

  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="team-slide relative isolate min-h-screen w-full overflow-hidden bg-[var(--bg-color)] flex flex-col items-center justify-center p-6 md:p-12">
    
    <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
      <path class="bg-line" d="M100,800 Q400,400 900,800" fill="none" stroke="var(--primary)" stroke-width="2" stroke-dasharray="1000" stroke-dashoffset="1000" />
      <path class="bg-line" d="M300,0 Q900,500 1500,0" fill="none" stroke="var(--secondary)" stroke-width="2" stroke-dasharray="1000" stroke-dashoffset="1000" />
      <circle cx="10%" cy="20%" r="5" fill="var(--primary)" class="animate-pulse" />
      <circle cx="90%" cy="80%" r="5" fill="var(--secondary)" class="animate-pulse" />
    </svg>

    <div class="team-title text-center mb-12 relative z-10">
      <p class="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-2">Execution Unit</p>
      <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[var(--text-color)]">
        КОМАНДА
      </h2>
    </div>

    <div class="team-grid grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
      
      <article 
        v-for="member in team" 
        :key="member.id"
        class="team-card group relative bg-white border-2 rounded-[32px] overflow-hidden transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl"
        :style="{ borderColor: member.color, boxShadow: `8px 8px 0px ${member.color}` }"
      >
        <div class="h-56 w-full bg-gray-100 relative overflow-hidden">
          <img
            :src="member.photo"
            class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            :alt="member.name"
          />
          <div class="absolute inset-0 opacity-30" :style="{ background: `linear-gradient(180deg, transparent 45%, ${member.color})` }"></div>
          
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="member.color" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
          </div>
        </div>

        <div class="p-6 text-center">
          <div class="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 text-white" :style="{ backgroundColor: member.color }">
            {{ member.role }}
          </div>
          
          <h3 class="text-2xl font-bold text-[var(--text-color)] mb-2 group-hover:text-[var(--primary)] transition-colors">
            {{ member.name }}
          </h3>
          
          <p class="text-sm text-gray-500 font-medium leading-relaxed">
            {{ member.desc }}
          </p>

          <div class="mt-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
             <div class="w-2 h-2 rounded-full bg-gray-300"></div>
             <div class="w-2 h-2 rounded-full bg-gray-300"></div>
             <div class="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>

      </article>

    </div>

    <div class="mt-12 text-center max-w-2xl text-gray-400 text-sm font-medium relative z-10">
      <p>Сбалансированная структура: Бизнес + Технологии + Рост.</p>
    </div>

  </section>
</template>

<style scoped>

</style>

