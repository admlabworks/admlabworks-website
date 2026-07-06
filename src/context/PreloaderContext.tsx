'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type PreloaderContextType = {
  isPreloaderDone: boolean
  markPreloaderDone: () => void
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderDone: false,
  markPreloaderDone: () => {},
})

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isPreloaderDone, setPreloaderDone] = useState(false)
  const markPreloaderDone = useCallback(() => setPreloaderDone(true), [])

  return (
    <PreloaderContext.Provider value={{ isPreloaderDone, markPreloaderDone }}>
      {children}
    </PreloaderContext.Provider>
  )
}

export function usePreloaderDone() {
  return useContext(PreloaderContext)
}
