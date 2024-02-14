import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Header from "./header"
import Footer from "./footer"
import styles from "./layout.module.css"
import utilStyles from "@/styles/utils.module.css"

//🍊💊 ₿ Fix the money, fix the world!"
export const siteTitle = "🍊💊 Satoshi Nakamoto Quotes Wiki"
const name = "Satoshi Vibes"
const audio_file = "/sounds/nosecondbest.mpeg"

type Props = {
  home?: boolean
  genericHeroImg?: boolean
  bottomHomeButton?: boolean
  backButton?: boolean
  children: React.ReactNode
}

const Layout = ({ children, home, genericHeroImg, bottomHomeButton, backButton }: Props) => {
  const router = useRouter()
  const [audio, setAudio] = useState(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    // client side: set audio inside useEffect() to avoid error (Audio type is not defined on server side)
    if (audio == null) setAudio(new Audio(audio_file))
  }, [])
  const togglePlay = () => {
    setPlaying(!playing)
  }
  useEffect(() => {
    playing ? audio?.play() : audio?.pause()
  }, [playing])

  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" type="image/svg" href="/icons/btcfavicon.svg" />
          <meta
            name="description"
            content="Get inspired! Read quotes about Bitcoin by the creator Satoshi Nakomoto. HODLujah 🚀"
          />
          <meta property="og:title" key="og:title" content={siteTitle} />
          <meta
            property="og:description"
            content="Get inspired! Read quotes about Bitcoin by the creator Satoshi Nakomoto. HODLujah 🚀"
          />
          <meta property="og:image" content="https://www.satoshivibes.com/preview.png" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Header />
        <header className={`${styles.header} ${utilStyles.textCenter}`}>
          {home && (
            <>
              <div onClick={togglePlay}>
                <Image
                  priority
                  src="/btclogo.png"
                  className={utilStyles.borderCircle}
                  height={630 / 5}
                  width={683 / 5}
                  alt="Bitcoin is infinitely divisible."
                />
              </div>
              <h3 className={utilStyles.heading2Xl}>{name}</h3>
            </>
          )}
          {genericHeroImg && (
            <div className={styles.scaledImage}>
              <Link href="/">
                <Image
                  priority
                  src="/astronaut.png"
                  height={784 / 4}
                  width={771 / 4}
                  alt="Bitcoin Astronaut hero image"
                />
              </Link>
            </div>
          )}
        </header>
        {/* everything below the hero image */}
        <main className={styles.mainStage}>
          {/* this is where all your child components get inserted */}
          {children}
          {!home && bottomHomeButton && (
            <Link href="/">
              <div className={`${styles.backHomeButton}`}>
                <Image
                  priority
                  src={"/icons/arrowleft.svg"}
                  height={36}
                  width={36}
                  alt="Back home (left arrow)"
                />
                <Image
                  priority
                  src="/icons/home.svg"
                  alt="Back home (home icon)"
                  height={36}
                  width={36}
                />
              </div>
            </Link>
          )}
          {backButton && (
            <div className={`${styles.back}`} onClick={() => router.back()}>
              <Image
                priority
                src="/icons/arrowleft.svg"
                height={36}
                width={36}
                alt="Back to previous page"
              />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
