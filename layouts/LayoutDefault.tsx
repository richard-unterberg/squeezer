import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-700.css'
import '#layouts/styles.css'

import { ReactNode, StrictMode } from 'react'
import Dropzone from 'react-dropzone'
import { PageContextClient, PageContextServer } from 'vike/types'

import LameContextProvider from '#components/LameContextProvider'
import UploadContextProvider from '#components/UploadContextProvider'
import useUploadContext from '#hooks/useUploadContext'
import Footer from '#layouts/Footer'
import Header from '#layouts/Header'
import { PageContextProvider } from '#renderer/usePageContext'

const LayoutDefault = ({ children }: { children: ReactNode }) => {
  const { isDropping, setIsDropping, setAttachments } = useUploadContext()

  const handleDrop = (acceptedFiles: File[]) => {
    setAttachments(acceptedFiles)
    setIsDropping(false)
  }

  return (
    <Dropzone
      noClick
      onDragOver={() => setIsDropping(true)}
      onDragLeave={() => setIsDropping(false)}
      onDrop={handleDrop}
    >
      {({ getRootProps }) => (
        <div {...getRootProps()} className="absolute inset-0">
          <div className={`max-w-4xl m-auto text-light ${isDropping ? 'opacity-10' : ''}`}>
            <div className="relative container px-5 mx-auto text-white text-base">
              <Header />
              <div>{children}</div>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

const LayoutProviderWrapper = ({
  pageContext,
  children,
}: {
  pageContext: PageContextClient | PageContextServer
  children: ReactNode
}) => (
  <StrictMode>
    <PageContextProvider pageContext={pageContext}>
      <UploadContextProvider>
        <LameContextProvider>
          <LayoutDefault>{children}</LayoutDefault>
        </LameContextProvider>
      </UploadContextProvider>
    </PageContextProvider>
  </StrictMode>
)

export default LayoutProviderWrapper
