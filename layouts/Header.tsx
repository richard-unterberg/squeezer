import Icon from '#components/Icon'
import Link from '#components/Link'
import Popover from '#components/Popover'
import useAppTheme from '#hooks/useTheme'
import { ICON_ID } from '#lib/icons/iconID'

const Header = () => {
  const { spacing } = useAppTheme()

  return (
    <div>
      <Popover>
        <Link aria-label="to-github" href="https://github.com/richard-unterberg/squeez" external>
          <Icon icon={ICON_ID.Github} size={spacing(8)} className="text-dark" />
        </Link>
      </Popover>

      <div className="xs:block md:flex gap-6 mt-16 my-10 items-center">
        <Icon
          icon={ICON_ID.AudioLines}
          className="mx-auto mb-4 md:mx-0 text-warning"
          size={spacing(24)}
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl mb-2 font-bold">squeez</h1>
          <h2 className="font-normal mb-6">
            browser based wav to mp3 converter
            <br /> no registration, no ads, no tracking
          </h2>
        </div>
      </div>
      <p className="mb-10">
        {`Tired of searching for a reliable WAV to MP3 converter that doesn't come with limitations or
        require registrations? So was I. That's why I created this hassle-free solution to help you
        seamlessly convert your audio files in the browser. 🌊`}
      </p>
    </div>
  )
}

export default Header
