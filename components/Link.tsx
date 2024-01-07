import { useCallback, useMemo } from 'react'

import { AppConfig } from '#lib/constants'
import { usePageContext } from '#root/renderer/usePageContext'

interface LinkProps {
  href?: string
  external?: boolean
  children: React.ReactNode | React.ReactNode[]
  className?: string
  hasButtonStyle?: boolean
  onClick?: () => void
}

const Link = ({ href, external, children, className = '', hasButtonStyle, onClick }: LinkProps) => {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  const isRouteActive = useMemo(() => {
    if (!href) return true
    if (href === '/') return urlPathname === '/'
    return urlPathname.startsWith(href)
  }, [href, urlPathname])

  const generatedClassName = useMemo(() => {
    const staticClassName = 'transition-colors duration-200 ease-in-out inline-block text-center'

    if (hasButtonStyle) {
      return `${
        isRouteActive && href
          ? 'bg-primary pointer-events-none'
          : 'bg-primary bg-opacity-80 hover:bg-opacity-100 shadow-md'
      } px-4 py-2 rounded-md ${className} ${staticClassName} `
    }

    return `${isRouteActive ? 'text-primary' : 'text-light'} ${className} ${staticClassName}`
  }, [hasButtonStyle, isRouteActive, className, href])

  const generatedHref = useMemo(
    () => `${!external ? AppConfig.viteBaseUrl : ''}${href}`,
    [external, href],
  )

  const handleClick = useCallback(
    (eventToCancel: React.PointerEvent) => {
      if (onClick) {
        eventToCancel.preventDefault()
        onClick()
      }
    },
    [onClick],
  )

  if (!href)
    return (
      <button type="button" className={`${generatedClassName}`} onPointerDown={handleClick}>
        {children}
      </button>
    )

  return (
    <a
      href={generatedHref}
      className={generatedClassName}
      target={external ? '_blank' : '_self'}
      rel={external ? 'noreferrer' : ''}
      onPointerDown={e => handleClick(e)}
    >
      {children}
    </a>
  )
}

export default Link
