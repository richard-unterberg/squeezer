import { useCallback, useContext, useMemo } from 'react'

import { UploadContext } from '#lamejs/UploadContextProvider'

const isValidWav = (file: File) => file.type === 'audio/wav'

const useUploadContext = () => {
  const context = useContext(UploadContext)

  const attachments = useMemo(() => context?.attachments || [], [context?.attachments])
  const handleSetAttachments = useMemo(
    () => context?.setAttachments || (() => []),
    [context?.setAttachments],
  )

  const formatError = useMemo(() => context?.formatError || false, [context?.formatError])
  const setFormatError = useMemo(
    () => context?.setFormatError || (() => false),
    [context?.setFormatError],
  )

  const isDropping = useMemo(() => context?.isDropping || false, [context?.isDropping])
  const setIsDropping = useMemo(
    () => context?.setIsDropping || (() => false),
    [context?.setIsDropping],
  )

  const setAttachments = useCallback(
    (files: File[]) => {
      files.forEach(file => {
        if (!isValidWav(file)) {
          setFormatError('File must be a .wav file  - Files ignored')
          return
        }
        const isDuplicate = attachments.some(prevFile => prevFile.name === file.name)

        if (isDuplicate) {
          setFormatError('File with the same name already exists - Files ignored')
        } else {
          // Add the file to the array if it's not a duplicate
          handleSetAttachments(previousFiles => [...previousFiles, file])
          setFormatError(false)
        }
      })
    },
    [attachments, handleSetAttachments, setFormatError],
  )

  const removeAttachment = useCallback(
    (fileName: string) => {
      handleSetAttachments(previousFiles => previousFiles.filter(file => file.name !== fileName))
    },
    [handleSetAttachments],
  )

  const clearAttachments = useCallback(() => {
    handleSetAttachments([])
  }, [handleSetAttachments])

  if (!context) {
    throw new Error('useUploadContext must be used within a Dialog')
  }

  return {
    attachments,
    formatError,
    isDropping,
    setAttachments,
    setIsDropping,
    setFormatError,
    removeAttachment,
    clearAttachments,
  } as const
}

export default useUploadContext
