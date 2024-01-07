import { createContext, useMemo, useState } from 'react'

import { LameJs } from '#lib/types'

interface LameContextValues {
  lamejs: LameJs | undefined
  setLamejs: React.Dispatch<React.SetStateAction<LameJs | undefined>>
}

export const LameContext = createContext<LameContextValues | undefined>(undefined)

const LameContextProvider = ({ children }: { children: JSX.Element }) => {
  const [lamejs, setLamejs] = useState<LameJs | undefined>(undefined)

  const LameContextValue = useMemo(() => ({ lamejs, setLamejs }), [lamejs, setLamejs])

  return <LameContext.Provider value={LameContextValue}>{children}</LameContext.Provider>
}

export default LameContextProvider
