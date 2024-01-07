import { useMemo } from 'react'

import Link from '#components/Link'
import useLameContext from '#hooks/useLameContext'

const ConvertButton = () => {
  const { handleConvert } = useLameContext()

  const LinkMemo = useMemo(
    () => (
      <Link hasButtonStyle className="bg-success" onClick={handleConvert}>
        Convert & Download
      </Link>
    ),
    [handleConvert],
  )

  return LinkMemo
}

export default ConvertButton
