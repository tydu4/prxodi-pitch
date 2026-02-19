<template>
  <section class="slide-container relative w-full h-screen overflow-hidden bg-[var(--bg-color)] flex flex-col items-center justify-center p-8 print:h-auto print:block print:overflow-visible">
    
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none print:hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[var(--primary)] opacity-5 blur-[100px] animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[var(--secondary)] opacity-5 blur-[100px] animate-pulse-slow delay-1000"></div>
    </div>

    <div class="text-center mb-10 z-10 print:mb-6">
      <h2 class="text-5xl md:text-7xl font-bold uppercase tracking-tight text-[var(--text-color)] mb-4">
        Бизнес-Модель
      </h2>
      <p class="text-xl md:text-2xl text-[var(--text-color)] opacity-70 font-medium">
        Монетизация Экосистемы
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl z-10 h-[60vh] print:h-auto print:gap-4">
      
      <div ref="b2bPillar" class="revenue-card group relative bg-white rounded-3xl border-2 border-[var(--primary)] shadow-xl overflow-hidden flex flex-col justify-between print:border-black print:shadow-none">
        <div class="liquid-fill absolute bottom-0 left-0 w-full bg-[var(--primary)] opacity-10 z-0 h-0 print:hidden"></div>
        
        <div class="relative z-10 p-8 h-full flex flex-col">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <div>
              <h3 class="text-3xl font-bold text-[var(--text-color)]">B2B</h3>
              <p class="text-[var(--primary)] font-bold uppercase tracking-wider text-sm">Организаторы</p>
            </div>
          </div>

          <ul class="space-y-6 mt-4 flex-grow">
            <li class="revenue-item flex items-start gap-3">
              <div class="mt-1 min-w-[24px] text-[var(--secondary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <span class="block text-lg font-bold text-[var(--text-color)]">Комиссия 5-10%</span>
                <span class="text-sm text-gray-500 font-medium leading-tight">С продажи билетов через встроенный эквайринг.</span>
              </div>
            </li>
            <li class="revenue-item flex items-start gap-3">
              <div class="mt-1 min-w-[24px] text-[var(--secondary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <div>
                <span class="block text-lg font-bold text-[var(--text-color)]">Direct-маркетинг</span>
                <span class="text-sm text-gray-500 font-medium leading-tight">Продвижение событий точно в целевые сегменты (по интересам).</span>
              </div>
            </li>
            <li class="revenue-item flex items-start gap-3">
              <div class="mt-1 min-w-[24px] text-[var(--secondary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              </div>
              <div>
                <span class="block text-lg font-bold text-[var(--text-color)]">Платная аналитика</span>
                <span class="text-sm text-gray-500 font-medium leading-tight">Отчеты по спросу, портрет аудитории и конкуренты.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div ref="b2cPillar" class="revenue-card group relative bg-white rounded-3xl border-2 border-[var(--secondary)] shadow-xl overflow-hidden flex flex-col justify-between print:border-black print:shadow-none">
        <div class="liquid-fill absolute bottom-0 left-0 w-full bg-[var(--secondary)] opacity-10 z-0 h-0 print:hidden"></div>

        <div class="relative z-10 p-8 h-full flex flex-col">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 rounded-2xl bg-[var(--secondary)] flex items-center justify-center text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div>
              <h3 class="text-3xl font-bold text-[var(--text-color)]">B2C</h3>
              <p class="text-[var(--secondary)] font-bold uppercase tracking-wider text-sm">Пользователи</p>
            </div>
          </div>

          <ul class="space-y-6 mt-4 flex-grow">
            <li class="revenue-item flex items-start gap-3">
              <div class="mt-1 min-w-[24px] text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
              </div>
              <div>
                <span class="block text-lg font-bold text-[var(--text-color)]">Free</span>
                <span class="text-sm text-gray-500 font-medium leading-tight">Весь функционал БЕСПЛАТНЫЙ</span>
              </div>
            </li>
            <li class="revenue-item flex items-start gap-3">
              <div class="mt-1 min-w-[24px] text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <div>
                <span class="block text-lg font-bold text-[var(--text-color)]">Микротранзакции</span>
                <span class="text-sm text-gray-500 font-medium leading-tight">Монетизация через покупки внутри приложения.</span>
              </div>
            </li>
            <li class="revenue-item flex items-start gap-3">
              <div class="mt-1 min-w-[24px] text-[var(--primary)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <span class="block text-lg font-bold text-[var(--text-color)]">Networking Pass</span>
                <span class="text-sm text-gray-500 font-medium leading-tight">Доступ к закрытым чатам и инструментам поиска компании.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div ref="ltvBlock" class="mt-6 w-full max-w-6xl z-10 print:mt-4">
      <div class="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-3xl p-[2px] shadow-2xl print:bg-none print:border-2 print:border-black">
        <div class="bg-white rounded-[22px] p-6 flex items-center justify-between print:bg-white">
          <div>
            <h4 class="text-2xl font-bold text-[var(--text-color)]">Unit Economics</h4>
            <p class="text-gray-500">Синергия двух потоков максимизирует LTV</p>
          </div>
          <div class="flex items-center gap-4">
             <div class="text-right">
                <span class="block text-sm font-bold text-[var(--primary)] uppercase">LTV</span>
                <span class="text-4xl font-black text-[var(--text-color)] tracking-tighter">ОГРОМНЫЙ ПОТЕНЦИАЛ</span>
             </div>
             <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
             </div>
          </div>
        </div>
      </div>
    </div>

    <div ref="particlesContainer" class="absolute inset-0 pointer-events-none z-0 print:hidden"></div>

  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, ref, onBeforeUnmount } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const b2bPillar = ref(null)
const b2cPillar = ref(null)
const ltvBlock = ref(null)
const particlesContainer = ref(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client) return

  ctx = gsap.context(() => {
    // 1. Columns Animation (Entry)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.slide-container',
        start: 'top center',
        toggleActions: 'play none none none',
        once: true,
      }
    })

    // Slide up cards
    tl.from([b2bPillar.value, b2cPillar.value], {
      y: 100,
      duration: 0.8,
      stagger: 0.2,
      immediateRender: false,
      ease: 'power3.out'
    })
    
    // Fill effect (Liquid)
    tl.to('.liquid-fill', {
      height: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
      stagger: 0.1
    }, '-=0.4')

    // List items reveal
    tl.from('.revenue-item', {
      y: 16,
      duration: 0.5,
      stagger: 0.1,
      immediateRender: false,
      ease: 'back.out(1.7)'
    }, '-=1.0')

    // LTV Block pop
    tl.from(ltvBlock.value, {
      scale: 0.8,
      duration: 0.6,
      immediateRender: false,
      ease: 'elastic.out(1, 0.5)'
    }, '-=0.2')

    // 2. Money Rain (Continuous)
    const createParticle = (xPos: number, colorVar: string) => {
      if (!particlesContainer.value) return
      const el = document.createElement('div')
      el.innerHTML = '$'
      el.style.position = 'absolute'
      el.style.left = `${xPos}%`
      el.style.top = '-50px'
      el.style.color = `var(${colorVar})`
      el.style.fontSize = `${gsap.utils.random(16, 24)}px`
      el.style.fontWeight = 'bold'
      el.style.opacity = '0.6'
      
      particlesContainer.value.appendChild(el)

      gsap.to(el, {
        y: window.innerHeight + 100,
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(2, 4),
        ease: 'none',
        onComplete: () => el.remove()
      })
    }

    // Spawn particles interval
    const interval = setInterval(() => {
        // Left side (B2B)
        createParticle(gsap.utils.random(20, 30), '--primary')
        // Right side (B2C)
        createParticle(gsap.utils.random(70, 80), '--secondary')
    }, 400)

    return () => clearInterval(interval)

  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>

</style>
