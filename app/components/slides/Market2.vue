<template>
  <section class="slide-container relative w-full h-screen overflow-hidden bg-[var(--bg-color)] flex flex-col items-center justify-center p-4 md:p-8 print:h-auto print:block print:overflow-visible">
    
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" 
         style="background-image: radial-gradient(var(--text-color) 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <div class="relative z-10 text-center mb-4 md:mb-6 print:mb-4">
      <h2 class="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[var(--text-color)] mb-2">
        <span class="opacity-30">ГДЕ</span> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">РЫНОК ДЛЯ РОСТА</span>
      </h2>
      <p class="text-xl md:text-2xl text-gray-500 font-medium">Свободные рынки против перенасыщенных</p>
    </div>

    <div class="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-auto md:h-[55vh] print:h-auto print:block">
      
      <div class="lg:col-span-4 relative group h-full">
        <div class="absolute inset-0 bg-red-500/10 blur-2xl rounded-3xl opacity-100"></div>
        <div class="h-full bg-white/50 backdrop-blur-sm border-2 border-red-100 rounded-[32px] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 print:border-black print:mb-4">
          
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-3 lg:mb-4">
              Перенасыщенный рынок
            </div>
            <h3 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-1 lg:mb-2 leading-none">Москва / Санкт-Петербург</h3>
            <p class="text-gray-500 text-base lg:text-lg">Перенасыщенный рынок</p>
          </div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 opacity-20 pointer-events-none">
            <div class="flex flex-wrap gap-2 justify-center">
              <div v-for="n in 12" :key="n" class="w-6 h-6 rounded-lg bg-red-900/40"></div>
            </div>
          </div>

          <div class="space-y-2 lg:space-y-4 z-10">
            <div class="metric-box">
              <span class="block text-2xl lg:text-3xl font-bold text-red-600">высокая стоимость привлечения пользователей</span>
              <span class="text-xs text-gray-500 uppercase">сильная конкуренция агрегаторов</span>
            </div>
            <div class="metric-box">
              <span class="block text-2xl lg:text-3xl font-bold text-red-600">~20%</span>
              <span class="text-xs text-gray-500 uppercase">Охват событий</span>
            </div>
          </div>
          
          <div class="absolute bottom-6 right-6 rotate-[-15deg] border-4 border-red-600 text-red-600 font-black text-2xl px-3 py-1 opacity-100 pointer-events-none">
            НЕ ТРОГАТЬ
          </div>
        </div>
      </div>

      <div class="lg:col-span-8 relative h-full">
        <div class="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-20 blur-3xl animate-pulse-slow rounded-3xl"></div>
        
        <div class="h-full bg-white border-2 border-[var(--primary)] rounded-[32px] p-6 lg:p-8 flex flex-col relative overflow-hidden shadow-2xl print:shadow-none print:border-black">
          
          <div class="absolute inset-0 z-0 opacity-10 pointer-events-none" 
               style="background-image: radial-gradient(var(--primary) 2px, transparent 2px); background-size: 30px 30px;">
          </div>
          
          <div class="absolute top-0 right-0 w-2/3 h-full z-0 hidden md:block print:hidden">
            <div class="absolute top-1/2 left-1/3 w-4 h-4 bg-[var(--primary)] rounded-full shadow-[0_0_30px_var(--primary)] z-10 animate-ping-slow"></div>
            <div class="absolute top-1/2 left-1/3 w-4 h-4 bg-[var(--primary)] rounded-full z-10"></div>
            
            <svg class="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
               <line x1="33%" y1="50%" x2="60%" y2="30%" stroke="var(--primary)" stroke-width="2" stroke-dasharray="10 5" class="animate-dash" />
               <line x1="33%" y1="50%" x2="70%" y2="60%" stroke="var(--primary)" stroke-width="2" stroke-dasharray="10 5" class="animate-dash delay-75" />
               <line x1="33%" y1="50%" x2="55%" y2="80%" stroke="var(--primary)" stroke-width="2" stroke-dasharray="10 5" class="animate-dash delay-150" />
            </svg>

            <div class="absolute top-[30%] left-[60%] city-node">
                <div class="bg-[var(--secondary)] text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1 shadow-lg">Ярославль</div>
                <div class="w-3 h-3 bg-[var(--secondary)] rounded-full mx-auto"></div>
            </div>
            <div class="absolute top-[60%] left-[70%] city-node" style="animation-delay: 0.2s">
                <div class="bg-[var(--secondary)] text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1 shadow-lg">Рязань</div>
                <div class="w-3 h-3 bg-[var(--secondary)] rounded-full mx-auto"></div>
            </div>
            <div class="absolute top-[80%] left-[55%] city-node" style="animation-delay: 0.4s">
                <div class="bg-[var(--secondary)] text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1 shadow-lg">Кострома</div>
                <div class="w-3 h-3 bg-[var(--secondary)] rounded-full mx-auto"></div>
            </div>
          </div>

          <div class="relative z-10 flex flex-col justify-between h-full w-full md:w-[55%]">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-3">
                Наш фокус
              </div>
              <h3 class="text-3xl lg:text-4xl font-black text-[var(--text-color)] mb-1 leading-tight">
                Региональные города <br/><span class="text-[0.6em] text-gray-500 block mt-1">(TAM / SAM / SOM)</span>
              </h3>
            </div>

            <div class="mt-4 space-y-3 flex-1 flex flex-col justify-end pb-2">
              <div class="market-metric rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg-color)]/80 backdrop-blur-md p-3 shadow-sm">
                <p class="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                  240 млрд ₽ <span class="text-lg opacity-50 text-gray-400">TAM</span>
                </p>
                <p class="text-sm font-medium text-gray-600 mt-1 leading-tight">
                  Вся индустрия развлечений и покупки билетов в России.
                </p>
              </div>
              
              <div class="market-metric rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg-color)]/80 backdrop-blur-md p-3 shadow-sm">
                <p class="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                  9 млрд ₽ <span class="text-lg opacity-50 text-gray-400">SAM</span>
                </p>
                <p class="text-sm font-medium text-gray-600 mt-1 leading-tight">
                  Рынок городских событий в регионах и городах-миллионниках.
                </p>
              </div>
              
              <div class="market-metric rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg-color)]/80 backdrop-blur-md p-3 shadow-sm">
                <p class="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                  540 млн ₽ <span class="text-lg opacity-50 text-gray-400">SOM</span>
                </p>
                <p class="text-sm font-medium text-gray-600 mt-1 leading-tight">
                  Реалистичный объем, который мы планируем занять за 2 года.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="w-full max-w-7xl mt-5 flex items-center gap-4 print:hidden">
      <span class="text-xs font-bold text-gray-400 uppercase whitespace-nowrap">Скорость масштабирования:</span>
      <div class="h-[2px] w-full bg-gray-200 relative overflow-hidden rounded-full">
        <div class="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] animate-progress-indeterminate"></div>
      </div>
      <span class="text-xs font-bold text-[var(--primary)] uppercase whitespace-nowrap">1 Регион / Неделя</span>
    </div>

  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onBeforeUnmount } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client) return

  ctx = gsap.context(() => {
    
    // 1. Reveal Animation
    gsap.from('.slide-container > div', {
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      immediateRender: false,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.slide-container',
        start: 'top 60%'
      }
    })

    // 2. City Nodes Pop
    gsap.from('.city-node', {
      scale: 0.7,
      duration: 0.5,
      stagger: 0.2,
      immediateRender: false,
      ease: 'back.out(1.7)',
      delay: 0.5,
      scrollTrigger: {
        trigger: '.slide-container',
        start: 'top 50%'
      }
    })

  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-ping-slow {
  animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.animate-dash {
  stroke-dashoffset: 100;
  animation: dash 3s linear infinite;
}
.animate-progress-indeterminate {
  animation: progress 2s ease-in-out infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes progress {
  0% { left: -40%; width: 40%; }
  50% { left: 100%; width: 40%; }
  100% { left: 100%; width: 40%; }
}


</style>
