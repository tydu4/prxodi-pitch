<template>
  <section class="slide-container relative w-full h-screen overflow-hidden bg-[var(--bg-color)] flex flex-col items-center justify-center p-6 md:p-12 print:h-auto print:block print:overflow-visible">
    
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" 
         style="background-image: radial-gradient(var(--text-color) 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <div class="relative z-10 text-center mb-8 md:mb-12 print:mb-6">
      <h2 class="text-5xl md:text-8xl font-black uppercase tracking-tighter text-[var(--text-color)] mb-2">
        <span class="opacity-30">ГДЕ</span> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">ДЕНЬГИ?</span>
      </h2>
      <p class="text-xl text-gray-500 font-medium">Стратегия голубого океана</p>
    </div>

    <div class="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 h-[65vh] print:h-auto print:block">
      
      <div class="lg:col-span-4 relative group">
        <div class="absolute inset-0 bg-red-500/10 blur-2xl rounded-3xl opacity-100"></div>
        <div class="h-full bg-white/50 backdrop-blur-sm border-2 border-red-100 rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 print:border-black print:mb-4">
          
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              Кровавый океан
            </div>
            <h3 class="text-4xl font-bold text-gray-800 mb-2 leading-none">МСК / СПБ</h3>
            <p class="text-gray-500 text-sm">Перенасыщенный рынок</p>
          </div>

          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 opacity-20">
            <div class="flex flex-wrap gap-2 justify-center">
              <div v-for="n in 12" :key="n" class="w-8 h-8 rounded-lg bg-red-900/40"></div>
            </div>
          </div>

          <div class="space-y-4 z-10">
            <div class="metric-box">
              <span class="block text-3xl font-bold text-red-600">High CAC</span>
              <span class="text-xs text-gray-500 uppercase">Стоимость клиента</span>
            </div>
            <div class="metric-box">
              <span class="block text-3xl font-bold text-red-600">~20%</span>
              <span class="text-xs text-gray-500 uppercase">Охват событий</span>
            </div>
          </div>
          
          <div class="absolute bottom-8 right-8 rotate-[-15deg] border-4 border-red-600 text-red-600 font-black text-2xl px-4 py-2 opacity-100">
            DON'T TOUCH
          </div>
        </div>
      </div>

      <div class="lg:col-span-8 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] opacity-20 blur-3xl animate-pulse-slow rounded-3xl"></div>
        
        <div class="h-full bg-white border-2 border-[var(--primary)] rounded-[32px] p-8 md:p-10 flex flex-col relative overflow-hidden shadow-2xl print:shadow-none print:border-black">
          
          <div class="absolute inset-0 z-0 opacity-10" 
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
                <div class="bg-[var(--secondary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 shadow-lg">Tula</div>
                <div class="w-3 h-3 bg-[var(--secondary)] rounded-full mx-auto"></div>
            </div>
            <div class="absolute top-[60%] left-[70%] city-node" style="animation-delay: 0.2s">
                <div class="bg-[var(--secondary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 shadow-lg">Ryazan</div>
                <div class="w-3 h-3 bg-[var(--secondary)] rounded-full mx-auto"></div>
            </div>
            <div class="absolute top-[80%] left-[55%] city-node" style="animation-delay: 0.4s">
                <div class="bg-[var(--secondary)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 shadow-lg">Kostroma</div>
                <div class="w-3 h-3 bg-[var(--secondary)] rounded-full mx-auto"></div>
            </div>
          </div>

          <div class="relative z-10 flex flex-col justify-between h-full w-full md:w-1/2">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-4">
                Наша Территория
              </div>
              <h3 class="text-5xl md:text-6xl font-black text-[var(--text-color)] mb-4 leading-[0.9]">
                РЕГИОНЫ<br>
                <span class="text-[var(--primary)]">500k+</span>
              </h3>
              <p class="text-lg text-gray-600 font-medium leading-relaxed">
                В городах-миллионниках (кроме Мск) информационный вакуум. Крупные игроки игнорируют 70% локального контента.
              </p>
            </div>

            <div class="mt-8 space-y-6">
              <div>
                <div class="flex items-baseline gap-2">
                  <span ref="counter" class="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">40</span>
                  <span class="text-4xl font-bold text-[var(--text-color)]">МЛН+</span>
                </div>
                <p class="text-sm font-bold text-gray-400 uppercase tracking-widest">Активная аудитория</p>
              </div>

              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span class="font-bold text-[var(--text-color)]">Монополия за 30 дней</span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span class="font-bold text-[var(--text-color)]">Запуск города = 0₽</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="w-full max-w-7xl mt-8 flex items-center gap-4 print:hidden">
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
import { onMounted, ref, onBeforeUnmount } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const counter = ref(null)
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

    // 3. Counter Animation
    gsap.to(counter.value, {
      innerText: 40,
      snap: { innerText: 1 },
      duration: 2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: '.slide-container',
        start: 'top 60%'
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
