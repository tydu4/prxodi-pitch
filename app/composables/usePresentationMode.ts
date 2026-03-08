export const usePresentationMode = () => {
  const isPSBMode = useState<boolean>('presentation-is-psb-mode', () => false)
  const isAutoTheme = useState<boolean>('presentation-is-auto-theme', () => true)

  const setPSBMode = (value: boolean) => {
    isPSBMode.value = value
  }

  const togglePSBMode = () => {
    isPSBMode.value = !isPSBMode.value
    return isPSBMode.value
  }

  const setAutoTheme = (value: boolean) => {
    isAutoTheme.value = value
  }

  const toggleAutoTheme = () => {
    isAutoTheme.value = !isAutoTheme.value
    return isAutoTheme.value
  }

  return {
    isPSBMode,
    isAutoTheme,
    setPSBMode,
    togglePSBMode,
    setAutoTheme,
    toggleAutoTheme,
  }
}
