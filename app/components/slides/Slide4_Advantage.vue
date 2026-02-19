<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// Данные для быстрого потока справа
const fastStream = [
  { source: 'TG Bot', event: 'Secret Party', status: 'SUCCESS' },
  { source: 'VK Parser', event: 'Art Lecture', status: 'SUCCESS' },
  { source: 'Web Spider', event: 'Jazz Night', status: 'SUCCESS' },
  { source: 'API Ingest', event: 'Marathon', status: 'SUCCESS' },
  { source: 'User Bot', event: 'Standup Open Mic', status: 'SUCCESS' },
  { source: 'TG Channel', event: 'Tech Meetup', status: 'SUCCESS' },
  { source: 'Instagram', event: 'Pop-up Market', status: 'SUCCESS' },
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return

  // Отключаем анимации для печати
  if (window.matchMedia('print').matches) return

  ctx = gsap.context(() => {
    // 1. Анимация ЛЕВОЙ стороны (Скука/Загрузка)
    // Имитируем медленное заполнение формы
    const tlLeft = gsap.timeline({ repeat: -1, repeatDelay: 1 })
    tlLeft.to('.manual-cursor', { opacity: 0, duration: 0.5, repeat: 5, yoyo: true }) // Мигание курсора
    
    // Загрузка, которая никогда не доходит до конца
    gsap.to('.loading-bar-stuck', { 
      width: '24%', 
      duration: 4, 
      ease: 'power1.out' 
    })

    // 2. Анимация ПРАВОЙ стороны (Скорость)
    // Бесконечный скролл карточек вверх
    gsap.to('.fast-stream-wrapper', {
      y: '-20%',
      duration: 2,
      ease: 'linear',
      repeat: -1
    })

    // Появление самого слайда
    gsap.from('.advantage-card', {
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      immediateRender: false,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 70%'
      }
    })

  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="slide-container relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[var(--bg-color)] overflow-x-hidden">
    
    <div class="text-center mb-10 z-10">
      <p class="text-[10px] uppercase tracking-[0.3em] text-[var(--primary)] font-bold mb-3">Unfair Advantage</p>
      <h2 class="text-4xl md:text-6xl font-black uppercase tracking-tight text-[var(--text-color)]">
        ОНИ ЖДУТ. <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">МЫ ЗАБИРАЕМ.</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl h-auto md:h-[500px]">
      
      <article class="advantage-card relative rounded-3xl border-2 border-gray-200 bg-gray-50 overflow-hidden flex flex-col p-6 md:p-8 shadow-inner group transition-all duration-500">
        <div class="absolute top-6 right-6 px-3 py-1 bg-gray-200 text-gray-500 text-xs font-bold uppercase rounded-full">
          Конкуренты
        </div>

        <div class="mt-4">
          <div class="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center mb-4 text-gray-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-700">Ручное добавление</h3>
          <p class="text-sm text-gray-500 mt-2 leading-relaxed">
            Организаторы должны сами прийти и заполнить форму. Модерация занимает 24 часа. Андеграунд игнорируется.
          </p>
        </div>

        <div class="mt-auto space-y-3 opacity-60">
           <div class="h-10 border border-gray-300 rounded-lg bg-white flex items-center px-3 text-sm text-gray-400">
             <span class="manual-typing">Название...</span><span class="manual-cursor w-[2px] h-4 bg-gray-400 ml-1"></span>
           </div>
           <div class="h-10 border border-gray-300 rounded-lg bg-white"></div>
           <div class="mt-4">
             <div class="flex justify-between text-[10px] uppercase font-bold text-gray-400 mb-1">
               <span>Loading Content...</span>
               <span>24%</span>
             </div>
             <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
               <div class="loading-bar-stuck h-full bg-gray-400 w-0"></div>
             </div>
           </div>
        </div>
      </article>

      <article class="advantage-card relative rounded-3xl border-2 border-[var(--primary)] bg-white overflow-hidden flex flex-col p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10">
        <div class="absolute top-6 right-6 px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold uppercase rounded-full shadow-lg animate-pulse">
          Наш Пайплайн
        </div>

        <div class="relative z-20 mt-4">
          <div class="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h3 class="text-2xl font-bold text-[var(--text-color)]">Авто-Парсинг</h3>
          <p class="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
            Мы забираем данные сами. Юзер-боты в закрытых чатах. AI чистит мусор. Публикация в ленте через 5 секунд после анонса.
          </p>
        </div>

        <div class="absolute inset-x-0 bottom-0 h-1/2 md:h-2/3 overflow-hidden z-10 mask-gradient-bottom">
           <div class="fast-stream-wrapper p-6 space-y-3 opacity-90">
             <div v-for="(item, i) in [...fastStream, ...fastStream]" :key="i" 
                  class="flex items-center justify-between p-3 bg-white border border-[var(--primary)]/30 rounded-xl shadow-sm backdrop-blur-sm">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-[var(--secondary)]"></div>
                  <div>
                    <div class="text-[10px] font-bold text-[var(--primary)] uppercase">{{ item.source }}</div>
                    <div class="text-xs font-bold text-gray-800">{{ item.event }}</div>
                  </div>
                </div>
                <div class="text-[10px] font-black text-green-500 border border-green-200 px-1 rounded bg-green-50">
                   {{ item.status }}
                </div>
             </div>
           </div>
        </div>

        <div class="absolute bottom-[-20%] right-[-20%] w-[300px] h-[300px] bg-gradient-to-t from-[var(--primary)] to-[var(--secondary)] opacity-10 blur-[80px] pointer-events-none"></div>
      </article>

    </div>

    <div class="grid grid-cols-2 gap-4 w-full max-w-4xl mt-8">
       <div class="text-center p-4 rounded-2xl bg-gray-50 border border-gray-200">
          <p class="text-xs font-bold text-gray-400 uppercase">Охват Конкурентов</p>
          <p class="text-3xl font-black text-gray-400 mt-1">~20%</p>
       </div>
       <div class="text-center p-4 rounded-2xl bg-white border-2 border-[var(--primary)] shadow-lg relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-10"></div>
          <p class="text-xs font-bold text-[var(--primary)] uppercase relative z-10">Наш Охват</p>
          <p class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] mt-1 relative z-10">100%</p>
       </div>
    </div>

  </section>
</template>

<style scoped>
.mask-gradient-bottom {
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 100%);
}


</style>
