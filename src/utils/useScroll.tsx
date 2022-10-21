import { useEffect, useState } from 'react'

const useScroll = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (): void => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}

export { useScroll }
