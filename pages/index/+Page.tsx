import { useCallback, useEffect, useMemo } from 'react'

import BoxElement from '#components/BoxElement'
import LameContextProvider from '#lamejs/LameContextProvider'
import UploadContextProvider from '#lamejs/UploadContextProvider'
import useLameContext from '#lamejs/useLameContext'
import useUploadContext from '#lamejs/useUploadContext'
import ConvertButton from '#pages/index/ConvertButton'
import AttachmentsList from '#root/pages/index/AttachmentsList'
import HowTo from '#root/pages/index/HowTo'
import UploadButton from '#root/pages/index/UploadButton'

const Page = () => {
  const { attachments, setAttachments } = useUploadContext()
  const { setLamejs } = useLameContext()

  useEffect(() => {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import('lamejs')
      .then(lamejsModule => {
        if (setLamejs) {
          setLamejs(lamejsModule)
        }
      })
      .catch(error => {
        throw new Error(`Failed to load lamejs: ${error}`)
      })
  }, [setLamejs])

  // const handleDrop = useCallback(
  //   (e: React.DragEvent<HTMLDivElement>) => {
  //     e.preventDefault()
  //     const files = Array.from(e.dataTransfer.files)
  //     setAttachments(files)
  //   },
  //   [setAttachments],
  // )

  const initialContent = useMemo(
    () => (
      <BoxElement className="flex justify-center my-10 p-14 bg-darkLight border-dashed">
        <UploadButton />
      </BoxElement>
    ),
    [],
  )

  const withFilesContent = useMemo(
    () => (
      <>
        <AttachmentsList />
        <div className="w-full flex justify-center mt-6 mb-16">
          <ConvertButton />
        </div>
      </>
    ),
    [],
  )

  return (
    <div>
      {!attachments.length ? initialContent : withFilesContent}
      <HowTo />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <p>
          <span className="font-bold text-primary">Privacy matters.</span> Your files are never
          stored on a server — everything is processed entirely within your browser, ensuring your
          data remains secure and confidential.
        </p>
        <p>
          Embrace the freedom to convert as many files as you need, without any limitations.
          Experience the convenience of our browser-based WAV to MP3 converter today.
        </p>
      </div>
    </div>
  )
}

const PageContextWrapper = () => (
  <UploadContextProvider>
    <LameContextProvider>
      <Page />
    </LameContextProvider>
  </UploadContextProvider>
)

export default PageContextWrapper
