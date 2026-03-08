<template>
  <section class="template-slide relative isolate h-full overflow-hidden flex items-center">
    <div class="energy-field pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col lg:flex-row gap-12 items-center px-6 md:px-12">
      
      <div class="flex-1 text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[var(--primary)] text-[var(--primary)] text-sm font-bold uppercase tracking-widest mb-6 bg-[var(--surface)]">
          Юнит-экономика
        </div>
        <h2 class="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-[clamp(2.5rem,4vw,4.5rem)] font-black leading-none text-transparent mb-6">
          Экономика одной продажи
        </h2>
        <p class="text-[clamp(1.1rem,1.5vw,1.3rem)] font-medium leading-relaxed [color:color-mix(in_srgb,var(--ink)_70%,transparent)]">
          За счет виральных механик (инвайты в чаты) мы кардинально снижаем стоимость привлечения. <br/><br/>
          А два потока доходов (комиссия с билета + B2B подписки) позволяют максимизировать LTV каждого пользователя.
        </p>
      </div>

      <div class="flex-1 w-full max-w-[600px]">
        <article class="relative rounded-[2rem] border-2 border-[color:color-mix(in_srgb,var(--ink)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--surface)_95%,var(--primary)_5%)] p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></div>
          
          <div class="space-y-4 font-mono text-lg font-bold">
            <div class="flex justify-between items-end border-b border-[color:color-mix(in_srgb,var(--ink)_10%,transparent)] pb-4">
              <div class="flex flex-col">
                <span class="text-[color:color-mix(in_srgb,var(--ink)_50%,transparent)] text-sm uppercase tracking-wider">LTV (Выручка за год)</span>
                <span class="text-[var(--ink)] text-2xl font-black mt-1">Средний чек + B2B</span>
              </div>
              <span class="text-[var(--primary)] text-4xl font-black">435 ₽</span>
            </div>

            <div class="flex justify-between items-center text-red-500/80 pt-2">
              <span>- CAC (Привлечение)</span>
              <span>110 ₽</span>
            </div>
            <div class="flex justify-between items-center text-red-500/80">
              <span>- IT / Себестоимость</span>
              <span>95 ₽</span>
            </div>
            <div class="flex justify-between items-center text-red-500/80">
              <span>- Налоги и комиссии</span>
              <span>42 ₽</span>
            </div>

            <div class="flex justify-between items-center bg-[color:color-mix(in_srgb,var(--secondary)_15%,transparent)] rounded-xl p-4 mt-6">
              <span class="text-[var(--ink)] text-xl uppercase tracking-widest font-black">Чистая прибыль</span>
              <span class="text-[var(--secondary)] text-4xl font-black">188 ₽</span>
            </div>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
.template-slide {
  block-size: 100vh;
  --surface: var(--bg-color, var(--bg-surface));
  --ink: var(--text-color, var(--fg));
  background: var(--surface);
  color: var(--ink);
}
.energy-field {
  background:
    radial-gradient(circle at 14% 20%, color-mix(in srgb, var(--primary) 15%, transparent) 0%, transparent 42%),
    radial-gradient(circle at 86% 80%, color-mix(in srgb, var(--secondary) 15%, transparent) 0%, transparent 42%),
    linear-gradient(to right, color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--ink) 5%, transparent) 1px, transparent 1px);
  background-size: auto, auto, 46px 46px, 46px 46px;
}
</style>