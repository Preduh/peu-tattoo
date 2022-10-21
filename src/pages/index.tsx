import type { NextPage } from 'next'
import Image from 'next/image'
import { useRef } from 'react'
import { Header } from '../components/Header'

const Home: NextPage = () => {
  const pageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={pageRef} className="h-full">
        <Header pageRef={pageRef} />
      <section className="bg-[url('/Meteor.svg')] w-full h-screen flex justify-between pt-20">

        <div className="h-full w-[48rem] flex items-center justify-center flex-col text-white uppercase space-y-8">
        <h3 className="font-bold text-3xl">Sentiu vontade de tatuar?</h3>
        <h2 className='font-black text-6xl'>Não perde tempo!</h2>
        <h3 className="font-bold text-3xl">Vem rabiscar sua pele comigo</h3>
        </div>
        <div className="relative w-[36rem] lg:w-[40rem] xl:w-[48rem] h-[calc(100%-5rem)] top-20 right-8">

          <Image
            priority
            src="/tattoo.webp"
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
      </section>

      <section
        className="bg-gradient-to-tr from-zinc-900 via-zinc-900 to-zinc-800 w-full h-screen"
        id="agenda-mensal"
      ></section>
      <section
        className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 w-full h-screen"
        id="portfolio"
      ></section>
      <section
        className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 w-full h-screen"
        id="quem-sou-eu"
      ></section>
      <section
        className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 w-full h-screen"
        id="precos"
      ></section>
    </div>
  )
}

export default Home
