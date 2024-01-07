import { useCallback, useRef } from 'react'

import Link from '#components/Link'
import useLame from '#hooks/useUploadContext'

interface UploadButtonProps {
  label?: string
}

const UploadButton = ({ label }: UploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setAttachments } = useLame()

  const handleClickHiddenInput = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      setAttachments(files)
    },
    [setAttachments],
  )

  return (
    <>
      <Link hasButtonStyle className="bg-primary" onClick={handleClickHiddenInput}>
        {label ? ` ${label}` : 'Select Files'}
      </Link>
      <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleChange} />
    </>
  )
}

export default UploadButton
