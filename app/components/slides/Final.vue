<template>
  <section 
    ref="root"
    class="slide-container relative w-full h-screen overflow-hidden flex items-center justify-center bg-[var(--bg-color)] print:h-auto print:block print:overflow-visible"
  >
    
    <div class="absolute inset-0 overflow-hidden pointer-events-none print:hidden">
      <div class="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[var(--primary)] opacity-10 blur-[120px] animate-pulse-slow"></div>
      <div class="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[var(--secondary)] opacity-10 blur-[120px] animate-pulse-slow delay-1000"></div>
      <div class="absolute top-[50%] left-[50%] w-[40vw] h-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-5 blur-[80px]"></div>
    </div>

 <div class="relative z-10 w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center print:block">
  
  <div class="flex flex-col justify-center print:mb-8">
    <div class="overflow-hidden mb-8 md:mb-12">
      <h2 class="hero-text text-6xl md:text-7xl font-black uppercase leading-[0.85] tracking-tighter text-[var(--text-color)] transform origin-bottom-left">
        <span class="block overflow-hidden"><span class="reveal-text inline-block">МЫ ГОТОВЫ</span></span>
        <span class="block overflow-hidden"><span class="reveal-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">К МАСШТАБУ</span></span>
      </h2>
    </div>
<div>
    <div class="request-list space-y-6 mt-2">
      
      <div class="request-item flex items-start gap-5 group cursor-default">
        <div class="w-14 h-14 shrink-0 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[var(--primary)] group-hover:border-transparent group-hover:bg-[var(--primary)] group-hover:text-white group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h4 class="text-xl md:text-2xl font-bold text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors mb-1">Пилотный запуск в Ярославле</h4>
          <p class="text-base md:text-lg text-gray-500 font-medium leading-relaxed">Отработка технологии полного цифрового охвата города. Доказываем, что в регионах можно найти 100% скрытых событий.</p>
        </div>
      </div>

      <div class="request-item flex items-start gap-5 group cursor-default">
        <div class="w-14 h-14 shrink-0 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[var(--primary)] group-hover:border-transparent group-hover:bg-[var(--primary)] group-hover:text-white group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h4 class="text-xl md:text-2xl font-bold text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors mb-1">Проверка сценариев</h4>
          <p class="text-base md:text-lg text-gray-500 font-medium leading-relaxed">Тестирование механик поиска компании (Buddy-matching) и влияния на досуг жителей в реальных условиях.</p>
        </div>
      </div>

      <div class="request-item flex items-start gap-5 group cursor-default">
        <div class="w-14 h-14 shrink-0 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[var(--secondary)] group-hover:border-transparent group-hover:bg-[var(--secondary)] group-hover:text-white group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h4 class="text-xl md:text-2xl font-bold text-[var(--text-color)] group-hover:text-[var(--secondary)] transition-colors mb-1">Формирование базы для роста</h4>
          <p class="text-base md:text-lg text-gray-500 font-medium leading-relaxed">Сбор чистых данных и метрик по монетизации для последующего масштабирования проверенной модели.</p>
        </div>
      </div>

    </div>
  </div>
  
</div>

      <div class="flex justify-center lg:justify-end print:mt-8">
        <div 
          ref="card"
          class="relative w-[500px] max-w-full md:w-[700px] aspect-[3.5/5] md:aspect-[4/5] bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 flex flex-col items-center justify-between overflow-hidden transform-gpu transition-transform duration-100 ease-out print:shadow-none print:border-2 print:border-black"
        >
          
          <div class="text-center z-10 mt-2 md:mt-4">
            <p class="text-lg md:text-xl font-bold uppercase tracking-widest text-gray-400">Сканируй для подключения</p>
            <h3 class="text-4xl md:text-6xl font-black text-[var(--text-color)] mt-2">ПРИХОДИ</h3>
          </div>

          <div class="qr-container relative z-10 w-80 h-80 md:w-[28rem] md:h-[28rem] bg-white rounded-2xl flex items-center justify-center">
            <div class="absolute -inset-1 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl blur opacity-30 animate-pulse print:hidden"></div>
            
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://t.me/prxodi_channel&color=000000&bgcolor=ffffff" 
              alt="QR Code"
              class="relative w-full h-full object-contain rounded-xl border-4 border-white shadow-sm"
            >
          </div>

          <div class="text-center z-10 mb-4 w-full">
             <div class="w-full h-[1px] bg-gray-100 mb-6"></div>
             <div class="flex flex-col gap-1">
               <span class="text-xl font-bold text-[var(--text-color)]">Свяжитесь с нами</span>
               <a href="mailto:ceo@prihodi.app" class="text-[var(--primary)] font-medium hover:underline">t.me/prxodi_channel</a>
               <a href="tel:+79990000000" class="text-gray-400 font-medium">t.me/tydu4</a>
             </div>
          </div>

          <div class="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, ref, onBeforeUnmount } from 'vue'

const root = ref(null)
const card = ref(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top center',
      }
    })

    // 1. Text Reveal
    tl.from('.reveal-text', {
      y: 100,
      duration: 1,
      stagger: 0.1,
      immediateRender: false,
      ease: 'power4.out'
    })

    // 2. Request Items Stagger
    tl.from('.request-item', {
      x: -50,
      duration: 0.6,
      stagger: 0.15,
      immediateRender: false,
      ease: 'back.out(1.5)'
    }, '-=0.5')

    // 3. Card Pop
    tl.from(card.value, {
      scale: 0.5,
      duration: 1.2,
      immediateRender: false,
      ease: 'elastic.out(1, 0.75)'
    }, '-=1')

    // 4. QR Pulse
    tl.fromTo('.qr-container', 
      { scale: 0.8 },
      { scale: 1, duration: 0.5, ease: 'back.out(2)' },
      '-=0.5'
    )
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>
.fade-swap-enter-active,
.fade-swap-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-swap-enter-from,
.fade-swap-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

</style>
