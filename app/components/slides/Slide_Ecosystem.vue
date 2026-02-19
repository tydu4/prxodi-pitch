<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

// Платформы для анимации "орбиты"
const platforms = [
  { name: 'Native App', desc: 'Android', icon: '📱' },
  { name: 'TG Mini-App', desc: 'SuperApp', icon: '✈️' },
  { name: 'AI Bots', desc: 'Telegram / Max', icon: '🤖' },
  { name: 'Web Portal', desc: 'Desktop Core', icon: '🌐' }
]

onMounted(() => {
  if (!root.value) return
  if (window.matchMedia('print').matches) return

  ctx = gsap.context(() => {
    
    // 1. Анимация появления заголовка (Glitch-style)
    gsap.from('.eco-title span', {
      y: 100,
      opacity: 0,
      rotateX: -90,
      transformOrigin: '0% 50% -50',
      duration: 1,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      scrollTrigger: { trigger: root.value, start: 'top 65%' }
    })

    // 2. Платформы (Спутники) - вылет и бесконечное парение
    gsap.from('.platform-pill', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: { trigger: root.value, start: 'top 70%' }
    })

    gsap.utils.toArray('.platform-pill').forEach((pill: any, i) => {
      gsap.to(pill, {
        y: gsap.utils.random(-15, 15),
        x: gsap.utils.random(-10, 10),
        rotation: gsap.utils.random(-5, 5),
        duration: gsap.utils.random(2.5, 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      })
    })

    // 3. Линии связи (Бегущие данные)
    gsap.to('.data-stream-line', {
      strokeDashoffset: -100,
      duration: 1,
      repeat: -1,
      ease: 'none'
    })

    // 4. Появление 3D Карточек экосистемы
    gsap.from('.eco-card', {
      y: 80,
      opacity: 0,
      rotateY: 15,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.eco-grid', start: 'top 75%' }
    })

    // 5. Интерактив (3D Tilt карточек при наведении мыши)
    const cards = gsap.utils.toArray('.eco-card')
    cards.forEach((card: any) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        gsap.to(card, {
          rotateX: ((y - centerY) / centerY) * -10,
          rotateY: ((x - centerX) / centerX) * 10,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
      })
    })

  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="root" class="ecosystem-slide relative isolate min-h-screen w-full overflow-hidden bg-[var(--bg-color)] flex flex-col items-center justify-center p-6 md:p-10 perspective-1000">
    
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20 hidden md:block">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path class="data-stream-line" d="M0,200 Q400,100 800,500 T1920,300" fill="none" stroke="var(--primary)" stroke-width="2" stroke-dasharray="15 15" opacity="0.5" />
        <path class="data-stream-line" d="M0,800 Q600,900 1000,400 T1920,800" fill="none" stroke="var(--secondary)" stroke-width="2" stroke-dasharray="15 15" opacity="0.5" />
      </svg>
    </div>

    <div class="relative z-10 text-center w-full max-w-5xl mb-8 md:mb-12">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 bg-white/50 backdrop-blur-md shadow-[0_0_20px_var(--primary-opacity-20)]">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
        </span>
        Omnichannel Presence
      </div>
      
      <h2 class="eco-title text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.9] text-[var(--text-color)] mb-6 perspective-1000">
        <span class="block">Бесшовная</span>
        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">Экосистема 360°</span>
      </h2>

      <div class="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-4">
        <div v-for="(platform, index) in platforms" :key="index" 
             class="platform-pill flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-gray-200 shadow-lg relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span class="text-xl relative z-10">{{ platform.icon }}</span>
          <div class="text-left relative z-10">
            <p class="text-xs font-black text-[var(--text-color)] leading-tight">{{ platform.name }}</p>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{{ platform.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="eco-grid relative z-10 w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 perspective-1000">
      
      <article class="eco-card transform-style-3d relative bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-2 border-gray-100 flex flex-col h-full z-30">
        <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="w-14 h-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center mb-6 shadow-xl ring-2 ring-[var(--primary)]/25 relative z-10">
           <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        
        <h3 class="text-2xl font-black text-[var(--text-color)] mb-1 uppercase tracking-tight">Пользователи</h3>
        <p class="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-6">Social Graph & Matching</p>
        
        <p class="text-sm font-medium text-gray-600 mb-6 leading-relaxed">
          Мы убили формат «доски объявлений». Это Tinder для ивентов. Мы не просто показываем куда пойти, мы собираем людей в стаи.
        </p>

        <ul class="space-y-4 mt-auto">
          <li class="flex items-start gap-3">
            <div class="w-5 h-5 rounded bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5"><span class="text-xs">◆</span></div>
            <div>
              <p class="text-sm font-bold text-[var(--text-color)]">Buddy-Matching</p>
              <p class="text-xs text-gray-500 font-medium">Свайп-механика поиска компании на вечер.</p>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-5 h-5 rounded bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5"><span class="text-xs">◆</span></div>
            <div>
              <p class="text-sm font-bold text-[var(--text-color)]">Комьюнити до старта</p>
              <p class="text-xs text-gray-500 font-medium">Чаты событий активируются сразу. Нетворкинг начинается до выхода из дома.</p>
            </div>
          </li>
        </ul>
      </article>

      <article class="eco-card transform-style-3d relative bg-gradient-to-br from-[var(--text-color)] to-gray-900 rounded-[32px] p-8 shadow-2xl border-2 border-gray-800 flex flex-col h-full z-20">
        
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white flex items-center justify-center mb-6 shadow-[0_0_30px_var(--secondary-opacity)] relative z-10">
           <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
        </div>
        
        <h3 class="text-2xl font-black text-white mb-1 uppercase tracking-tight">Организаторы</h3>
        <p class="text-xs font-bold uppercase tracking-widest text-[color:color-mix(in_srgb,var(--secondary)_75%,white)] mb-6">Target Engine & Control</p>
        
        <p class="text-sm font-medium text-gray-100 mb-6 leading-relaxed">
          Организатор больше не ждет зрителей вслепую. Платформа сама находит нужную когорту через парсинг интересов.
        </p>

        <ul class="space-y-4 mt-auto">
          <li class="flex items-start gap-3">
            <div class="w-5 h-5 rounded bg-[var(--secondary)]/20 text-[var(--secondary)] flex items-center justify-center shrink-0 mt-0.5"><span class="text-xs">◆</span></div>
            <div>
              <p class="text-sm font-bold text-white">Прямой Push (Direct)</p>
              <p class="text-xs text-gray-200 font-medium">Доставка анонса прямо в телефоны целевой аудитории (боты/апп).</p>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-5 h-5 rounded bg-[var(--secondary)]/20 text-[var(--secondary)] flex items-center justify-center shrink-0 mt-0.5"><span class="text-xs">◆</span></div>
            <div>
              <p class="text-sm font-bold text-white">Управление толпой</p>
              <p class="text-xs text-gray-200 font-medium">Модерация аудитории, динамическое ценообразование и геймификация скидок.</p>
            </div>
          </li>
        </ul>
      </article>

      <article class="eco-card transform-style-3d relative bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-2 border-[var(--primary)] flex flex-col h-full z-10">
        <div class="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/5 to-transparent rounded-[32px] pointer-events-none"></div>

        <div class="w-14 h-14 rounded-2xl bg-white border-2 border-[var(--primary)] text-[var(--primary)] flex items-center justify-center mb-6 shadow-xl relative z-10">
           <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>
        </div>
        
        <h3 class="text-2xl font-black text-[var(--text-color)] mb-1 uppercase tracking-tight">Владельцы Локаций</h3>
        <p class="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-6">Smart Real Estate</p>
        
        <p class="text-sm font-medium text-gray-600 mb-6 leading-relaxed">
          Простаивающие лофты, крыши и бары превращаются в актив. Мы автоматически матчим пустые слоты с организаторами.
        </p>

        <ul class="space-y-4 mt-auto">
          <li class="flex items-start gap-3">
            <div class="w-5 h-5 rounded bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5"><span class="text-xs">◆</span></div>
            <div>
              <p class="text-sm font-bold text-[var(--text-color)]">Uber для ивентов</p>
              <p class="text-xs text-gray-500 font-medium">Сдача площадей в аренду в пару кликов. Платформа приводит готовые тусовки.</p>
            </div>
          </li>
          <li class="flex items-start gap-3">
            <div class="w-5 h-5 rounded bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5"><span class="text-xs">◆</span></div>
            <div>
              <p class="text-sm font-bold text-[var(--text-color)]">Доп. трафик</p>
              <p class="text-xs text-gray-500 font-medium">Закрытие «мертвых часов» за счет генерации потока от платформы.</p>
            </div>
          </li>
        </ul>
      </article>

    </div>
  </section>
</template>

<style scoped>
.transform-style-3d {
  transform-style: preserve-3d;
}
</style>
