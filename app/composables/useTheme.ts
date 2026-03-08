import { watch } from 'vue'

export type ThemeBackgroundStyle = 'white' | 'soft-gray'

export type ThemeState = {
  primary: string
  secondary: string
  gradient: string
  bg_style: ThemeBackgroundStyle
}

type HueRange = [number, number]

type PaletteFamily = {
  name: 'blue-purple' | 'orange-red' | 'green-teal' | 'violet-yellow'
  primaryHue: HueRange
  secondaryHue: HueRange
  saturation: [number, number]
  lightness: [number, number]
  bgStyle: ThemeBackgroundStyle
}

const DEFAULT_THEME: ThemeState = {
  primary: '#0055FF',
  secondary: '#FF0055',
  gradient: 'from-[#0055FF] to-[#FF0055]',
  bg_style: 'white',
}

const PALETTE_FAMILIES: PaletteFamily[] = [
  {
    name: 'blue-purple',
    primaryHue: [214, 232],
    secondaryHue: [254, 278],
    saturation: [82, 95],
    lightness: [50, 58],
    bgStyle: 'white',
  },
  {
    name: 'orange-red',
    primaryHue: [20, 34],
    secondaryHue: [352, 10],
    saturation: [84, 96],
    lightness: [50, 58],
    bgStyle: 'soft-gray',
  },
  {
    name: 'green-teal',
    primaryHue: [142, 162],
    secondaryHue: [174, 194],
    saturation: [76, 90],
    lightness: [42, 54],
    bgStyle: 'soft-gray',
  },
  {
    name: 'violet-yellow',
    primaryHue: [264, 286],
    secondaryHue: [46, 60],
    saturation: [80, 95],
    lightness: [50, 60],
    bgStyle: 'white',
  },
]

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomHueFromRange = (range: HueRange): number => {
  const [min, max] = range
  if (min <= max) {
    return randomInt(min, max)
  }

  const upperSpan = 360 - min
  const lowerSpan = max + 1
  const totalSpan = upperSpan + lowerSpan
  const randomSlot = randomInt(0, totalSpan - 1)

  if (randomSlot < upperSpan) {
    return min + randomSlot
  }

  return randomSlot - upperSpan
}

const hslToHex = (hue: number, saturation: number, lightness: number): string => {
  const h = hue % 360
  const s = saturation / 100
  const l = lightness / 100

  const chroma = (1 - Math.abs(2 * l - 1)) * s
  const hPrime = h / 60
  const x = chroma * (1 - Math.abs((hPrime % 2) - 1))

  let r = 0
  let g = 0
  let b = 0

  if (hPrime >= 0 && hPrime < 1) {
    r = chroma
    g = x
  } else if (hPrime >= 1 && hPrime < 2) {
    r = x
    g = chroma
  } else if (hPrime >= 2 && hPrime < 3) {
    g = chroma
    b = x
  } else if (hPrime >= 3 && hPrime < 4) {
    g = x
    b = chroma
  } else if (hPrime >= 4 && hPrime < 5) {
    r = x
    b = chroma
  } else {
    r = chroma
    b = x
  }

  const matchValue = l - chroma / 2

  const channelToHex = (value: number): string => {
    return Math.round((value + matchValue) * 255)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()
  }

  return `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}`
}

const buildGradientClass = (primary: string, secondary: string): string => {
  return `from-[${primary}] to-[${secondary}]`
}

const normalizeHex = (value: string | undefined, fallback: string): string => {
  if (!value) {
    return fallback
  }

  const normalized = value.trim().toUpperCase()
  if (/^#[0-9A-F]{6}$/.test(normalized)) {
    return normalized
  }

  return fallback
}

const resolveBackgroundColor = (style: ThemeBackgroundStyle): string => {
  return style === 'soft-gray' ? '#F4F5F8' : '#FFFFFF'
}

const applyThemeCssVariables = (theme: ThemeState): void => {
  if (!import.meta.client) {
    return
  }

  const root = document.documentElement
  const background = resolveBackgroundColor(theme.bg_style)

  root.style.setProperty('--primary', theme.primary)
  root.style.setProperty('--secondary', theme.secondary)
  root.style.setProperty('--accent', theme.primary)
  root.style.setProperty('--bg', background)
  root.style.setProperty('--bg-surface', background)
  root.style.setProperty('--grid-alpha', theme.bg_style === 'soft-gray' ? '0.07' : '0.085')
}

export const useTheme = () => {
  const theme = useState<ThemeState>('global-theme', () => ({ ...DEFAULT_THEME }))
  const watcherBound = useState<boolean>('global-theme-watcher', () => false)

  const setTheme = (input: Partial<ThemeState>): ThemeState => {
    const primary = normalizeHex(input.primary, theme.value.primary)
    const secondary = normalizeHex(input.secondary, theme.value.secondary)
    const bgStyle = input.bg_style ?? theme.value.bg_style
    const gradient = input.gradient ?? buildGradientClass(primary, secondary)

    theme.value = {
      primary,
      secondary,
      gradient,
      bg_style: bgStyle,
    }

    return theme.value
  }

  const generateRandomTheme = (): ThemeState => {
    const family = PALETTE_FAMILIES[randomInt(0, PALETTE_FAMILIES.length - 1)] ?? PALETTE_FAMILIES[0]
    if (!family) {
      return setTheme(DEFAULT_THEME)
    }

    const saturation = randomInt(family.saturation[0], family.saturation[1])
    const primaryLightness = randomInt(family.lightness[0], family.lightness[1])
    const secondaryLightness = Math.max(42, primaryLightness - randomInt(2, 9))

    const nextPrimary = hslToHex(
      randomHueFromRange(family.primaryHue),
      saturation,
      primaryLightness,
    )
    const nextSecondary = hslToHex(
      randomHueFromRange(family.secondaryHue),
      Math.min(98, saturation + randomInt(-4, 5)),
      secondaryLightness,
    )

    const nextBgStyle = Math.random() > 0.8
      ? (family.bgStyle === 'white' ? 'soft-gray' : 'white')
      : family.bgStyle

    return setTheme({
      primary: nextPrimary,
      secondary: nextSecondary,
      gradient: buildGradientClass(nextPrimary, nextSecondary),
      bg_style: nextBgStyle,
    })
  }

  const randomizeTheme = (): ThemeState => {
    return generateRandomTheme()
  }

  if (import.meta.client && !watcherBound.value) {
    watch(
      theme,
      (nextTheme) => {
        applyThemeCssVariables(nextTheme)
      },
      { deep: true, immediate: true },
    )

    watcherBound.value = true
  }

  return {
    theme,
    setTheme,
    randomizeTheme,
    generateRandomTheme,
  }
}
