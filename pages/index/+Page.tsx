import { useEffect, useMemo } from 'react'

import BoxElement from '#components/BoxElement'
import useLameContext from '#hooks/useLameContext'
import useUploadContext from '#hooks/useUploadContext'
import BitrateSelection from '#pages/index/BitrateSelection'
import ConvertButton from '#pages/index/ConvertButton'
import AttachmentsList from '#root/pages/index/AttachmentsList'
import HowTo from '#root/pages/index/HowTo'
import UploadButton from '#root/pages/index/UploadButton'

const Page = () => {
  const { attachments, setFormatError, formatError } = useUploadContext()
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
        setFormatError(
          'Failed to load LameJS. Reload the page - please try again later. report a bug on github',
        )
        throw new Error(error)
      })
  }, [setFormatError, setLamejs])

  const initialContent = useMemo(
    () => (
      <>
        <BoxElement className="flex justify-center mt-10 mb-4 p-14 bg-darkLight border-dashed">
          <UploadButton />
        </BoxElement>
        <BitrateSelection className="mb-16" />
      </>
    ),
    [],
  )

  const withFilesContent = useMemo(
    () => (
      <>
        <AttachmentsList />
        <div className="flex justify-between mb-16 items-center mt-4">
          <BitrateSelection />
          <ConvertButton />
        </div>
      </>
    ),
    [],
  )

  return (
    <>
      {formatError && <p className="bg-warning p-3 mb-8 text-dark">⚠️ {formatError}</p>}
      {!attachments.length ? initialContent : withFilesContent}
      <HowTo />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray">
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
    </>
  )
}

export default Page
