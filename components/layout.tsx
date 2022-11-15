import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Header from "./header"
import Footer from "./footer"
import styles from "./layout.module.css"
import utilStyles from "@/styles/utils.module.css"
import { motion } from "framer-motion"

//🍊💊 ₿ Fix the money, fix the world!"
export const siteTitle = "🍊💊 Satoshi Nakamoto Quotes Wiki"
const name = "Satoshi Vibes"
const audio_file = "/sounds/nosecondbest.mpeg"

type Props = {
  home?: boolean
  genericHeroImg?: boolean
  homeButton?: boolean
  backButton?: boolean
  children: React.ReactNode
}
// animate: defines animation.
// initial: defines initial state of animation
// exit: defines animation for when component exits
const easing = [0.6, -0.05, 0.01, 0.99]

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
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

  const easing = [0.6, -0.05, 0.01, 0.99]

  const fadeInUp = {
    initial: {
      y: -80,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  }

  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" type="image/svg" href="/icons/btcfavicon.svg" />
          <meta
            name="description"
            content="Get inspired! Read quotes about Bitcoin by the creator Satoshi Nakomoto. HODLujah🚀"
          />
          <meta name="og:title" content={siteTitle} />
          <meta
            property="og:description"
            content="Get inspired! Read quotes about Bitcoin by the creator Satoshi Nakomoto. HODLujah🚀"
          />
          <meta property="og:image" content="https://www.satoshivibes.com/preview.png" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Header />
        <motion.div
          exit={{ opacity: 0 }}
          initial="initial"
          animate="animate"
          className={styles.mainStage}
        >
          <motion.div variants={fadeInUp} className={`${styles.header} ${utilStyles.textCenter}`}>
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
                  <a>
                    <Image
                      priority
                      src="/astronaut.png"
                      height={764 / 4}
                      width={771 / 4}
                      alt="Bitcoin Astronaut hero image"
                    />
                  </a>
                </Link>
              </div>
            )}
          </motion.div>
          <main className={styles.mainStage}>
            {/* this is where all your child components get inserted */}
            {children}
            {!home && homeButton && (
              <Link href="/">
                <a>
                  <div className={`${styles.backHomeButton}`}>
                    <Image priority src={"/icons/arrowleft.svg"} height={36} width={36} alt="" />
                    <Image priority src="/icons/home.svg" alt="" height={36} width={36} />
                  </div>
                </a>
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
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </main>
        </motion.div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
