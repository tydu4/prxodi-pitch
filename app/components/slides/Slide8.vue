<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('print').matches) return

  ctx = gsap.context(() => {
    
    // 1. Анимация "Стыковки" (Docking)
    const tlDock = gsap.timeline({
      defaults: {
        immediateRender: false,
      },
      scrollTrigger: {
        trigger: root.value,
        start: 'top 60%',
      }
    })

    // Партнер (Серый блок)
    tlDock.from('.partner-block', { x: -50, duration: 0.8, ease: 'power2.out' })
    // Наш модуль (Цветной блок)
    tlDock.from('.module-block', { x: 50, duration: 0.8, ease: 'power2.out' }, '<')
    // Соединение
    tlDock.to('.connector-pin', { width: '100%', duration: 0.4, ease: 'power1.in' })
          .to('.partner-block', { 
             borderColor: 'var(--primary)', 
             boxShadow: '0 0 30px var(--primary-opacity)',
             duration: 0.4 
          })
          .to('.system-status', {
            color: '#22c55e',
            duration: 0.1,
            onStart: () => {
              const statusLabels = gsap.utils.toArray<HTMLElement>('.system-status')
              statusLabels.forEach((node) => {
                node.textContent = 'SYSTEM: ONLINE'
              })
            },
          })

    // 2. Появление карточек
    gsap.from('.feature-card', {
      y: 50,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
      immediateRender: false,
      ease: 'back.out(1.2)',
      scrollTrigger: { trigger: '.features-grid', start: 'top 80%' }
    })

    // 3. API Stream (код на фоне)
    gsap.to('.code-stream', {
      y: '-50%',
      duration: 20,
      repeat: -1,
      ease: 'linear'
    })

  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="general-slide relative isolate min-h-screen w-full overflow-hidden bg-[var(--bg-color)] flex flex-col items-center justify-center p-6 md:p-12">
    
    <div class="absolute inset-0 opacity-10 pointer-events-none" 
         style="background-image: linear-gradient(var(--text-color) 1px, transparent 1px), linear-gradient(90deg, var(--text-color) 1px, transparent 1px); background-size: 50px 50px;">
    </div>
    
    <div class="text-center mb-10 relative z-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--primary)] text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest mb-4 bg-white/50 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse"></span>
        B2B Integration
      </div>
      <h2 class="text-4xl md:text-6xl font-black uppercase leading-[0.9] text-[var(--text-color)]">
        Lifestyle as a <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Service</span>
      </h2>
      <p class="mt-4 text-gray-500 font-medium max-w-xl mx-auto">
        Встраиваемый модуль событий для банков, телекомов и городских порталов.
      </p>
    </div>

    <div class="w-full max-w-5xl h-32 md:h-40 relative z-10 mb-12 flex items-center justify-center gap-2 md:gap-4">
      
      <div class="partner-block w-1/3 h-full border-2 border-dashed border-gray-300 rounded-[24px] flex flex-col items-center justify-center bg-gray-50 transition-colors duration-500">
         <span class="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Your App</span>
         <div class="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
            <svg class="text-gray-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
         </div>
      </div>

      <div class="w-[30%] h-full border-2 border-[var(--primary)] rounded-[24px] bg-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center px-3">
         <span class="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] mb-2">Secure Bridge</span>
         <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden relative">
            <div class="connector-pin w-0 h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
         </div>
      </div>

      <div class="module-block w-1/3 h-full border-2 border-[var(--primary)] rounded-[24px] flex flex-col items-center justify-center bg-white shadow-[0_0_30px_rgba(0,0,0,0.08)] relative overflow-hidden">
         <div class="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10"></div>
         <span class="system-status relative z-10 text-[var(--primary)] font-extrabold uppercase text-xs tracking-widest mb-1 bg-white/80 px-2 py-0.5 rounded-full">Ready</span>
         <div class="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white shadow-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
         </div>
      </div>

    </div>

    <div class="features-grid relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <article class="feature-card group rounded-[32px] bg-white border-2 border-gray-100 p-8 shadow-xl hover:border-[var(--primary)] transition-all overflow-hidden">
        <div class="code-stream absolute top-0 right-0 w-full opacity-5 text-[10px] font-mono leading-tight text-right pointer-events-none">
           GET /api/v1/events<br>Auth: Bearer Token<br>{ "city": "yar", "tags": ["tech"] }<br>Status: 200 OK<br>...
        </div>
        <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
        </div>
        <h3 class="text-xl font-bold text-[var(--text-color)] mb-2">API-First</h3>
        <p class="text-sm text-gray-500 leading-relaxed">
           Легкая интеграция через REST API. Вы получаете чистый поток данных, мы берем на себя парсинг, очистку и AI-рекомендации.
        </p>
      </article>

      <article class="feature-card group rounded-[32px] bg-[linear-gradient(160deg,#0b1222,#132244)] text-white p-8 shadow-[0_22px_50px_rgba(9,16,34,0.45)] border-2 border-white/25 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-white/16 to-transparent opacity-30"></div>
        <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
        </div>
        <h3 class="text-xl font-bold mb-2 text-white drop-shadow-sm">White Label</h3>
        <p class="text-[0.98rem] text-white/95 leading-relaxed font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
           Ваш бренд — наши технологии. Встраивайте афишу и поиск компании нативно в свой интерфейс. Пользователь даже не поймет, что это сторонний сервис.
        </p>
      </article>

      <article class="feature-card group rounded-[32px] bg-white border-2 border-[var(--secondary)] p-8 shadow-xl">
        <div class="w-12 h-12 rounded-full bg-red-50 text-[var(--secondary)] flex items-center justify-center mb-4">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
        </div>
        <h3 class="text-xl font-bold text-[var(--text-color)] mb-2">Retention +15%</h3>
        <p class="text-sm text-gray-500 leading-relaxed">
           Пользователи заходят в ваше приложение не только ради платежей, но и чтобы узнать "куда сходить". Увеличиваем частоту сессий (DAU).
        </p>
      </article>

    </div>

  </section>
</template>

<style scoped>

</style>
