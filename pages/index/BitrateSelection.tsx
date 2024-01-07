import { useCallback } from 'react'

import useLameContext from '#hooks/useLameContext'
import { OutputBitrates } from '#lib/constants'

const BitrateSelection = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { outputBits, setOutputBits } = useLameContext()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (setOutputBits) {
        setOutputBits(parseInt(e.target.value, 10))
      }
    },
    [setOutputBits],
  )

  return (
    <div {...props}>
      <label htmlFor="bitrate" className="flex w-full gap-2 items-center">
        <span>Output Bitrate:</span>
        <select
          id="bitrate"
          onChange={handleChange}
          value={outputBits}
          className="p-1 bg-dark border-grayDark border rounded-md"
        >
          {OutputBitrates.map(bitrate => (
            <option key={bitrate} value={bitrate}>
              {bitrate}
            </option>
          ))}
        </select>
        <span>kbps</span>
      </label>
    </div>
  )
}

export default BitrateSelection
