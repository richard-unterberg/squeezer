import { useCallback, useContext, useMemo } from 'react'

import convertTo from '#lamejs/convert'
import { LameContext } from '#lamejs/LameContextProvider'
import useUploadContext from '#lamejs/useUploadContext'

const useLameContext = () => {
  const context = useContext(LameContext)
  const lamejs = useMemo(() => context?.lamejs, [context?.lamejs])
  const setLamejs = useMemo(() => context?.setLamejs, [context?.setLamejs])
  const { attachments } = useUploadContext()

  const handleConvert = useCallback(() => {
    attachments.forEach(file => {
      convertTo({ file, lameLib: lamejs })
        .then(mp3File => {
          // Handle the resulting MP3 File object
          // For example, trigger a download:
          const downloadLink = document.createElement('a')
          downloadLink.href = URL.createObjectURL(mp3File)
          downloadLink.download = mp3File.name
          downloadLink.click()
        })
        .catch(error => {
          throw new Error(error)
        })
    })
  }, [attachments, lamejs])

  return { lamejs, setLamejs, handleConvert }
}

export default useLameContext
