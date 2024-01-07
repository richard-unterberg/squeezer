import BoxElement from '#components/BoxElement'
import Icon from '#components/Icon'
import { ICON_ID } from '#lib/icons/iconID'

const HowTo = () => (
  <BoxElement
    className="bg-opacity-50 mb-10 relative overflow-hidden justify-between md:flex items-center"
    label="How It Works:"
  >
    <Icon icon={ICON_ID.Drum} className="text-darkLight absolute h-40 w-40 right-5 top-5" />
    <ul className="grid grid-cols-1 md:grid-cols-2 relative gap-3">
      <li>
        <strong>Select Files:</strong>
        <br /> Simply drag and drop your WAV file onto the page or use button below.
      </li>
      <li>
        <strong>Convert:</strong>
        <br /> Convert & Get your MP3 file instantly, ready for use.
      </li>
    </ul>
  </BoxElement>
)

export default HowTo
