import { useCallback, useContext, useMemo, useState } from 'react'

import { UploadContext } from '#root/lamejs/UploadContextProvider'

const isValidWav = (file: File) => file.type === 'audio/wav'

const useUploadContext = () => {
  const context = useContext(UploadContext)
  const attachments = useMemo(() => context?.attachments || [], [context?.attachments])
  const [formatError, setFormatError] = useState(false)

  const handleSetAttachments = useMemo(
    () => context?.setAttachments || (() => []),
    [context?.setAttachments],
  )

  const setAttachments = useCallback(
    (files: File[]) => {
      files.forEach(file => {
        if (!isValidWav(file)) {
          setFormatError(true)
          return
        }
        handleSetAttachments(previousFiles => [...previousFiles, file])
        setFormatError(false)
      })
    },
    [handleSetAttachments],
  )

  if (!context) {
    throw new Error('useUploadContext must be used within a Dialog')
  }

  return { attachments, formatError, setAttachments } as const
}

export default useUploadContext
