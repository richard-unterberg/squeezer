import { createContext, useMemo, useState } from 'react'

interface UploadContextValues {
  attachments: File[]
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>
  isDropping: boolean
  setIsDropping: React.Dispatch<React.SetStateAction<boolean>>
  formatError: string | false
  setFormatError: React.Dispatch<React.SetStateAction<string | false>>
}

export const UploadContext = createContext<UploadContextValues | undefined>(undefined)

const UploadContextProvider = ({ children }: { children: JSX.Element }) => {
  const [attachments, setAttachments] = useState<File[]>([])
  const [isDropping, setIsDropping] = useState(false)
  const [formatError, setFormatError] = useState<string | false>(false)

  const UploadContextValue = useMemo(
    () => ({ attachments, setAttachments, isDropping, setIsDropping, formatError, setFormatError }),
    [attachments, formatError, isDropping],
  )

  return <UploadContext.Provider value={UploadContextValue}>{children}</UploadContext.Provider>
}

export default UploadContextProvider
