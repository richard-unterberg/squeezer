import { createContext, useMemo, useState } from 'react'

interface UploadContextValues {
  attachments: File[]
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>
}

export const UploadContext = createContext<UploadContextValues | undefined>(undefined)

const UploadContextProvider = ({ children }: { children: JSX.Element }) => {
  const [attachments, setAttachments] = useState<File[]>([])

  const UploadContextValue = useMemo(
    () => ({ attachments, setAttachments }),
    [attachments, setAttachments],
  )

  return <UploadContext.Provider value={UploadContextValue}>{children}</UploadContext.Provider>
}

export default UploadContextProvider
