import { useCallback, useContext, useMemo } from 'react'

import { LameContext } from '#components/LameContextProvider'
import useUploadContext from '#hooks/useUploadContext'
import convertTo from '#lamejs/convert'

const useLameContext = () => {
  const context = useContext(LameContext)
  const lamejs = useMemo(() => context?.lamejs, [context?.lamejs])
  const setLamejs = useMemo(() => context?.setLamejs, [context?.setLamejs])
  const outputBits = useMemo(() => context?.outputBits, [context?.outputBits])
  const setOutputBits = useMemo(() => context?.setOutputBits, [context?.setOutputBits])
  const { attachments } = useUploadContext()

  const handleConvert = useCallback(() => {
    const conversionSequence = attachments.reduce(
      (chain, file) =>
        chain.then(() =>
          convertTo({ file, lameLib: lamejs, outputBits })
            .then(mp3File => {
              const downloadLink = document.createElement('a')
              downloadLink.href = URL.createObjectURL(mp3File)
              downloadLink.download = mp3File.name
              downloadLink.click()
            })
            .catch(error => {
              throw new Error(error)
            }),
        ),
      Promise.resolve(),
    )

    return conversionSequence
  }, [attachments, lamejs, outputBits])

  return { lamejs, outputBits, setLamejs, handleConvert, setOutputBits }
}

export default useLameContext
