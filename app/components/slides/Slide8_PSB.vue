<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import logo1 from '~/assets/svg/1.svg'
import logo2 from '~/assets/svg/2.svg'
import logo3 from '~/assets/svg/3.svg'
import logo4 from '~/assets/svg/4.svg'
import logo5 from '~/assets/svg/5.svg'
import logo6 from '~/assets/svg/6.svg'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// Логотипы ПСБ для фона (пузырьки)
const psbLogos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
]

// Детерминированные позиции пузырьков для SSR/CSR без hydration mismatch
const bubbleOffsets = [
  0.04, 0.11, 0.18, 0.26, 0.33,
  0.41, 0.48, 0.55, 0.62, 0.69,
  0.75, 0.81, 0.87, 0.92, 0.97,
]

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('print').matches) return

  ctx = gsap.context(() => {
    
    // 1. ПУЗЫРЬКИ ЛОГОТИПОВ (Bubbles Effect)
    // Генерируем бесконечный поток всплывающих логотипов
    const bubbles = gsap.utils.toArray('.psb-bubble')
    bubbles.forEach((bubble: any) => {
      // Рандомные параметры для каждого пузырька
      const duration = gsap.utils.random(4, 8)
      const delay = gsap.utils.random(0, 5)
      const xWobble = gsap.utils.random(-50, 50)
      
      // Анимация всплытия
      gsap.fromTo(bubble, 
        { 
          y: '110vh', 
          x: 0, 
          opacity: 0, 
          scale: 0 
        },
        {
          y: '-20vh',
          x: xWobble,
          opacity: gsap.utils.random(0.3, 0.8), // Разная прозрачность
          scale: gsap.utils.random(0.5, 1.2), // Разный размер
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: 'power1.inOut'
        }
      )
      
      // Добавляем вращение
      gsap.to(bubble, {
        rotation: 360,
        duration: gsap.utils.random(5, 10),
        repeat: -1,
        ease: 'linear'
      })
    })

    // 2. THE HOOK: "ПРИХОДИ -> ПСБ"
    const tlHook = gsap.timeline({
      defaults: {
        immediateRender: false,
      },
      scrollTrigger: {
        trigger: root.value,
        start: 'top 60%',
      }
    })

    tlHook.from('.hook-prihodi', { x: -200, duration: 0.8, ease: 'back.out(1.2)' })
          .from('.hook-in', { scale: 0, duration: 0.4 }, '-=0.4')
          .from('.hook-psb', { x: 200, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.6')
          // Эффект слияния/удара
          .to('.hook-container', { 
            scale: 1.1, 
            duration: 0.2, 
            yoyo: true, 
            repeat: 1, 
            ease: 'power2.inOut' 
          })

    // 3. ПОЯВЛЕНИЕ КАРТОЧЕК (Bento Smash)
    gsap.from('.bento-card', {
      y: 100,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
      immediateRender: false,
      ease: 'circ.out',
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 85%'
      }
    })

    // Счетчик команд (20 -> 200)
    gsap.to('.counter-val', {
      innerText: 200,
      snap: { innerText: 1 },
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' }
    })

  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="psb-slide relative isolate min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center p-4 md:p-8">
    
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div v-for="(offset, index) in bubbleOffsets" :key="`bubble-${index}`" 
           class="psb-bubble absolute left-[calc(var(--rnd)*100%)] w-16 h-16 md:w-24 md:h-24 flex items-center justify-center"
           :style="{ '--rnd': offset }"
      >
        <img :src="psbLogos[index % psbLogos.length]" class="w-full h-full object-contain drop-shadow-lg" alt="" />
      </div>
    </div>

    <div class="relative z-10 mb-12 text-center w-full max-w-5xl">
      <div class="hook-container inline-flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-white/60 backdrop-blur-md border border-[var(--psb-blue)]/20 p-6 md:p-10 rounded-[40px] shadow-2xl">
        
        <div class="hook-prihodi flex items-center gap-3">
          <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--psb-orange)] flex items-center justify-center text-white shadow-lg">
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
          <span class="text-4xl md:text-6xl font-black text-[var(--psb-ink)] uppercase tracking-tighter">ПРИХОДИ</span>
        </div>

        <div class="hook-in flex flex-col items-center">
          <span class="text-xl md:text-2xl font-bold text-gray-400 italic font-serif">в</span>
          <div class="w-1 h-8 bg-[var(--psb-orange)] rounded-full mt-1 animate-pulse"></div>
        </div>

        <div class="hook-psb flex items-center gap-3">
           <span class="text-4xl md:text-6xl font-black text-[var(--psb-blue)] uppercase tracking-tighter">ПСБ</span>
           <div class="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[var(--psb-blue)] flex items-center justify-center text-white shadow-lg overflow-hidden">
             <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
           </div>
        </div>

      </div>
      
      <p class="mt-6 text-lg md:text-xl font-bold text-[var(--psb-ink)] max-w-2xl mx-auto leading-relaxed">
        Не просто интеграция. Мы превращаем банковское приложение в <span class="text-[var(--psb-orange)] underline decoration-4 underline-offset-4">центр городской жизни</span>.
      </p>
    </div>

    <div class="bento-grid relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
      
      <article class="bento-card lg:col-span-7 group relative overflow-hidden rounded-[24px] bg-[var(--psb-blue)] text-white p-6 md:p-8 shadow-[10px_10px_0px_#003366] hover:translate-y-[-4px] hover:shadow-[14px_14px_0px_#003366] transition-all duration-300">
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-4">
             <h3 class="text-2xl md:text-3xl font-black uppercase">Свой Продукт</h3>
             <span class="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">White Label</span>
          </div>
          <p class="text-lg font-medium opacity-90 max-w-lg leading-relaxed">
            Хватит кормить Timepad и отдавать им данные. ПСБ получает собственный инструмент для ивентов. Полный контроль над биллингом, комиссией и аналитикой.
          </p>
        </div>
        <svg class="absolute bottom-[-20px] right-[-20px] w-40 h-40 text-white opacity-10 rotate-12 group-hover:rotate-0 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
      </article>

      <article class="bento-card lg:col-span-5 group relative overflow-hidden rounded-[24px] bg-white border-2 border-[var(--psb-orange)] p-6 md:p-8 shadow-[10px_10px_0px_rgba(255,102,0,0.2)] hover:shadow-[14px_14px_0px_rgba(255,102,0,0.3)] transition-all">
        <h3 class="text-xl font-bold text-[var(--psb-ink)] mb-4 uppercase">Акселератор (Факт)</h3>
        <div class="flex items-center justify-between gap-4">
           <div class="text-center">
             <span class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Было</span>
             <span class="text-4xl md:text-5xl font-black text-gray-300 line-through decoration-red-500 decoration-4">20</span>
             <span class="block text-[10px] text-gray-400 mt-1">команд</span>
           </div>
           <div class="text-2xl font-black text-[var(--psb-blue)]">➜</div>
           <div class="text-center">
             <span class="block text-xs font-bold text-[var(--psb-blue)] uppercase tracking-widest">Будет</span>
             <span class="counter-val text-5xl md:text-6xl font-black text-[var(--psb-orange)]">200</span>
             <span class="block text-[10px] text-[var(--psb-orange)] font-bold mt-1">целевых заявок</span>
           </div>
        </div>
        <p class="text-xs font-bold text-center mt-4 text-gray-500 bg-gray-50 py-2 rounded-lg">
          Мы не "льем трафик". Мы находим людей по интересам.
        </p>
      </article>

      <article class="bento-card lg:col-span-4 group relative overflow-hidden rounded-[24px] bg-[var(--psb-ink)] text-white p-6 shadow-xl">
         <h3 class="text-lg font-bold text-[var(--psb-orange)] mb-2 uppercase tracking-wider">Хозяева Города</h3>
         <p class="text-sm leading-relaxed text-gray-300">
           ПСБ перевез штаб-квартиру в Ярославль. Мы — цифровое ядро этого города. Вместе мы станем 
           <span class="text-white font-bold underline decoration-[var(--psb-orange)]">Главным Приложением</span> 
           в телефоне каждого жителя.
         </p>
         <div class="mt-4 flex items-center gap-2">
            <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span class="text-[10px] font-bold uppercase tracking-widest text-green-400">Region Locked</span>
         </div>
      </article>

      <article class="bento-card lg:col-span-8 group relative overflow-hidden rounded-[24px] bg-gradient-to-r from-gray-100 to-white border-2 border-gray-200 p-6 flex items-center justify-between shadow-lg">
         <div class="relative z-10 pr-4">
            <h3 class="text-2xl font-black text-[var(--psb-ink)] mb-1 uppercase">Готовый Пилот</h3>
            <p class="text-gray-600 text-sm font-medium max-w-md">
              Модуль Lifestyle-сервиса готов к встройке в Super-App. Повышаем Retention и частоту открытий приложения (DAU).
            </p>
            <button class="mt-4 bg-[var(--psb-blue)] text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[var(--psb-orange)] transition-colors shadow-lg">
               Запустить тест
            </button>
         </div>
         
        <div class="hidden sm:flex w-24 h-24 bg-[var(--psb-blue)] rounded-2xl items-center justify-center rotate-6 group-hover:rotate-12 transition-transform shadow-2xl overflow-hidden">
            <img :src="logo6" class="w-12 h-12 object-contain" alt="logo">
        </div>
      </article>

    </div>

  </section>
</template>

<style scoped>
.psb-slide {
  --psb-blue: #004a99;
  --psb-orange: #ff6600;
  --psb-ink: #122947;
}


</style>
