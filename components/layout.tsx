import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Header from "./header"
import Footer from "./footer"
import styles from "./layout.module.css"
import utilStyles from "@/styles/utils.module.css"

export const siteTitle = "🍊💊 ₿ Fix the money, fix the world!"
const name = "Satoshi Vibes"
const audio_file = "/sounds/nosecondbest.mpeg"

type Props = {
  home?: boolean
  genericHeroImg?: boolean
  homeButton?: boolean
  backButton?: boolean
  children: React.ReactNode
}

const Layout = ({ children, home, genericHeroImg, homeButton, backButton }: Props) => {
  const router = useRouter()
  const [audio, setAudio] = useState(null)
  const [playing, setPlaying] = useState(false)
  // client side: set audio inside useEffect() to avoid error (Audio type is not defined on server side)
  useEffect(() => {
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
            name="Satoshi Nakamoto's Quotes"
            content="Read quotes from Satoshi Nakomoto about Bitcoin."
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
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
                  height={764 / 4}
                  width={771 / 4}
                  alt="Bitcoin Astronaut hero image"
                />
              </Link>
            </div>
          )}
        </header>
        <main className={styles.mainStage}>
          {/* this is where all your child components get inserted */}
          {children}
          {!home && homeButton && (
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
