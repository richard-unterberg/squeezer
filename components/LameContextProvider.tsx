import { createContext, useMemo, useState } from 'react'

import { AppConfig } from '#lib/constants'
import { LameJs } from '#lib/types'

interface LameContextValues {
  lamejs: LameJs | undefined
  setLamejs: React.Dispatch<React.SetStateAction<LameJs | undefined>>
  outputBits: number
  setOutputBits: React.Dispatch<React.SetStateAction<number>>
}

export const LameContext = createContext<LameContextValues | undefined>(undefined)

const LameContextProvider = ({ children }: { children: JSX.Element }) => {
  const [lamejs, setLamejs] = useState<LameJs | undefined>(undefined)
  const [outputBits, setOutputBits] = useState(AppConfig.defaultOutputBitrate)

  const LameContextValue = useMemo(
    () => ({ lamejs, setLamejs, outputBits, setOutputBits }),
    [lamejs, outputBits],
  )

  return <LameContext.Provider value={LameContextValue}>{children}</LameContext.Provider>
}

export default LameContextProvider
