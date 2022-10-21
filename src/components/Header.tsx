import { RefObject, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useScroll } from '../utils/useScroll'

interface HeaderProps {
  pageRef: RefObject<HTMLDivElement>
}

interface Option {
  id: string
  name: string
  path: string
  screenPosition: number
}

const options: Option[] = [
  {
    id: uuid(),
    name: 'Agenda mensal',
    path: 'agenda-mensal',
    screenPosition: 20
  },
  {
    id: uuid(),
    name: 'Portfólio',
    path: 'portfolio',
    screenPosition: 40
  },
  {
    id: uuid(),
    name: 'Quem sou eu',
    path: 'quem-sou-eu',
    screenPosition: 60
  },
  {
    id: uuid(),
    name: 'Preços',
    path: 'precos',
    screenPosition: 80
  }
]

export const Header = ({ pageRef }: HeaderProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState('')
  const getScroll = useScroll()
  const [disableRealTimeScrollRefresh, setDisableRealTimeScrollRefresh] =
    useState(false)
  const [timeoutId, setTimeoutId] = useState(0)

  const handleOptionClick = (option: Option | null): void => {
    setDisableRealTimeScrollRefresh(true)
    setSelectedOption(option ? option.path : '')

    window.clearTimeout(timeoutId)
    setTimeoutId(
      window.setTimeout(() => setDisableRealTimeScrollRefresh(false), 750)
    )

    if (!option) {
      window.scroll(0, 0)
    } else if (pageRef.current?.offsetHeight && option) {
      const height =
        pageRef.current?.offsetHeight * (option?.screenPosition / 100)
      window.scroll(0, height)
    }
  }

  useEffect(() => {
    if (pageRef.current?.offsetHeight && !disableRealTimeScrollRefresh) {
      const percentualScreen = (getScroll * 100) / pageRef.current?.offsetHeight

      if (percentualScreen === 0) {
        setSelectedOption('')
      } else if (percentualScreen > 0 && percentualScreen <= 20) {
        setSelectedOption(options[0].path)
      } else if (percentualScreen > 20 && percentualScreen <= 40) {
        setSelectedOption(options[1].path)
      } else if (percentualScreen > 40 && percentualScreen <= 60) {
        setSelectedOption(options[2].path)
      } else {
        setSelectedOption(options[3].path)
      }
    }
  }, [getScroll, disableRealTimeScrollRefresh])

  return (
    <div className={`w-full px-8 h-20 flex items-center justify-between fixed top-0 z-10 ${getScroll > 0 ? 'bg-zinc-900' : ''}`}>
      {selectedOption === ''
        ? (
        <button onClick={() => handleOptionClick(null)}>
          <h1 className="text-amber-500 hover:text-amber-600 transition-colors uppercase font-black text-xl">
            Peu
            <br />
            <span className="ml-2">Tattoo</span>
          </h1>
        </button>
          )
        : (
        <button onClick={() => handleOptionClick(null)}>
          <h1 className="text-white hover:text-gray-300 transition-colors uppercase font-black text-xl">
            Peu
            <br />
            <span className="ml-2">Tattoo</span>
          </h1>
        </button>
          )}

      <div className="space-x-4">
        {options.map((option) => {
          if (option.path === selectedOption) {
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="text-amber-500 hover:text-amber-600 transition-colors uppercase font-semibold text-sm"
              >
                {option.name}
              </button>
            )
          }

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="text-white hover:text-gray-300 transition-colors uppercase font-semibold text-sm"
            >
              {option.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
