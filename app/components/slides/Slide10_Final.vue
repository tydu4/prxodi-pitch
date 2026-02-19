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
        <div class="overflow-hidden mb-6">
          <h2 class="hero-text text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-[var(--text-color)] transform origin-bottom-left">
            <span class="block overflow-hidden"><span class="reveal-text inline-block">МЫ ГОТОВЫ</span></span>
            <span class="block overflow-hidden"><span class="reveal-text inline-block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">К МАСШТАБУ</span></span>
          </h2>
        </div>

        <div class="request-list space-y-6 mt-8">
          <div class="request-item flex items-center gap-5 group cursor-default">
            <div class="w-12 h-12 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div>
              <h4 class="text-xl font-bold text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Грант на маркетинг</h4>
              <p class="text-gray-500 font-medium">Под аудиторию Ярославской области.</p>
            </div>
          </div>

          <div class="request-item flex items-center gap-5 group cursor-default">
            <div class="w-12 h-12 rounded-full border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
            </div>
            <div>
              <h4 class="text-xl font-bold text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Инфраструктура</h4>
              <p class="text-gray-500 font-medium">Серверные мощности для 50+ городов.</p>
            </div>
          </div>

          <div class="request-item flex items-center gap-5 group cursor-default">
            <div class="w-12 h-12 rounded-full border-2 border-[var(--secondary)] flex items-center justify-center text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-all duration-300 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <Transition name="fade-swap" mode="out-in">
              <div :key="isPSBMode ? 'psb' : 'general'">
                <h4 class="text-xl font-bold text-[var(--text-color)] group-hover:text-[var(--secondary)] transition-colors">{{ thirdAsk.title }}</h4>
                <p class="text-gray-500 font-medium">{{ thirdAsk.subtitle }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div class="flex justify-center lg:justify-end print:mt-8">
        <div 
          ref="card"
          class="relative w-[500px] max-w-full md:w-[700px] aspect-[3.5/5] md:aspect-[4/5] bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 flex flex-col items-center justify-between overflow-hidden transform-gpu transition-transform duration-100 ease-out print:shadow-none print:border-2 print:border-black"
        >
          
          <div class="text-center z-10 mt-2 md:mt-4">
            <p class="text-sm md:text-base font-bold uppercase tracking-widest text-gray-400">Scan to Connect</p>
            <h3 class="text-3xl md:text-5xl font-black text-[var(--text-color)] mt-2">ПРИХОДИ</h3>
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
               <span class="text-lg font-bold text-[var(--text-color)]">Свяжитесь с нами</span>
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
import { computed, onMounted, ref, onBeforeUnmount } from 'vue'

const { isPSBMode } = usePresentationMode()

const thirdAsk = computed(() => {
  if (isPSBMode.value) {
    return {
      title: '\u041f\u0438\u043b\u043e\u0442 \u0441 \u041f\u0421\u0411',
      subtitle: '\u0417\u0430\u043f\u0443\u0441\u043a \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0437\u0430 14 \u0434\u043d\u0435\u0439.',
    }
  }

  return {
    title: '\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u043f\u0430\u0440\u0442\u043d\u0435\u0440\u0441\u0442\u0432\u043e',
    subtitle: '\u041c\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043c\u043e\u0434\u0435\u043b\u0438 \u0432 5 \u043d\u043e\u0432\u044b\u0445 \u0440\u0435\u0433\u0438\u043e\u043d\u043e\u0432.',
  }
})

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
