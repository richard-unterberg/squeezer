import tw from 'tailwind-styled-components'

const StyledBoxElement = tw.div`
  p-5
  md:p-8
  m-0
  border
  rounded
  items-center
  text-small
  gap-2
  text-grayLight
  bg-darkLight
  border-darkLightBorder
`

interface BoxElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[]
  label?: React.ReactNode | React.ReactNode[] | string
}

const BoxElement = ({ children, label, ...props }: BoxElementProps) => (
  <div className="relative shadow-md">
    <div className="absolute left-5 md:left-8 -top-3 z-10 text-gray font-bold">{label}</div>
    <StyledBoxElement className={`${props.className} ${label ? 'pt-5 md:pt-8' : ''}`}>
      {children}
    </StyledBoxElement>
  </div>
)

export default BoxElement
