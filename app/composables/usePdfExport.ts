import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick } from 'vue'

type LenisLike = {
  stop?: () => void
  destroy?: () => void
}

gsap.registerPlugin(ScrollTrigger)

const wait = (ms: number) => new Promise<void>((resolve) => {
  window.setTimeout(resolve, ms)
})

const getPrintZoom = (): number => {
  const slide = document.querySelector<HTMLElement>('.slide-container')
  if (!slide) {
    return 1
  }

  const rect = slide.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) {
    return 1
  }

  const fitX = window.innerWidth / rect.width
  const fitY = window.innerHeight / rect.height
  return Math.max(0.5, Math.min(1, fitX, fitY))
}

export const usePdfExport = () => {
  const isExporting = useState<boolean>('pdf-export:is-exporting', () => false)
  const needsReload = useState<boolean>('pdf-export:needs-reload', () => false)

  const cleanupAfterPrint = (previousZoom: string) => {
    if (!import.meta.client) {
      return
    }

    document.body.classList.remove('is-printing')
    document.body.style.zoom = previousZoom
    isExporting.value = false
    needsReload.value = true
  }

  const exportPdf = async () => {
    if (!import.meta.client || isExporting.value) {
      return
    }

    isExporting.value = true
    needsReload.value = false
    document.body.classList.add('is-printing')
    const previousZoom = document.body.style.zoom

    const lenis = (window as Window & { __lenis?: LenisLike | null }).__lenis
    lenis?.stop?.()

    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill(true)
    })

    gsap.killTweensOf('*')

    const nextZoom = getPrintZoom()
    document.body.style.zoom = `${nextZoom}`

    await nextTick()
    await wait(500)

    let cleaned = false
    const finalize = () => {
      if (cleaned) {
        return
      }

      cleaned = true
      cleanupAfterPrint(previousZoom)
    }

    window.addEventListener('afterprint', finalize, { once: true })

    try {
      window.print()
      window.setTimeout(finalize, 1000)
    } catch (error) {
      finalize()
      throw error
    }
  }

  const resetView = () => {
    if (!import.meta.client) {
      return
    }

    window.location.reload()
  }

  return {
    exportPdf,
    resetView,
    isExporting,
    needsReload,
  }
}
