import styles from "./header.module.css"
import HamburgerMenu from "./hamburger"
import PricePanel from "./pricepanel"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const data = [
  // internal pages use link, external pages use url
  { name: "Home", link: "/", image: "/icons/home.svg" },
  {
    name: "Bitcoin",
    link: "/bitcoin",
    image: "/icons/file.svg",
    target: "_blank",
  },
  {
    name: "Tor Proxy",
    link: "/torproxy",
    image: "/icons/snowflake.svg",
  },
  //  TODO - disable, implement custom zap component
  // {
  //   name: "Zap Me",
  //   image: "/icons/lightning.svg",
  //   buttonScript: true,
  // },
  // Strike tip button
  {
    name: "Tip Jar",
    url: "https://strike.me/lukeonchain/",
    image: "/icons/qrcode.svg",
    target: "_blank",
  },
  //  TODO - replace this with Nostr contact instead? hmm
  {
    name: "Contact",
    url: "https://t.me/lukeonchain/",
    image: "/icons/contact.svg",
    target: "_blank",
  },
  { name: "About", link: "/about", image: "/icons/about.svg" },
]

const Navigation = () => {
  // Declare a new state variable "hamburgerOpen"
  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  // toggle menu state (used for onClick events)
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen)
  }

  return (
    <>
      {/* price on top left, menu top right */}
      <div className={styles.headerContainer}>
        <PricePanel />
        <div
          className={hamburgerOpen ? styles.hamburgerOpen : styles.hamburger}
          onClick={toggleHamburger}
        >
          <HamburgerMenu />
        </div>
      </div>

      {/* conditional CSS style for navigation (for slide out transition) */}
      <div
        className={hamburgerOpen ? styles.activeNavigationMenu : styles.navigationMenu}
        onClick={toggleHamburger}
      >
        <ul>
          {data.map((item, i) => (
            <li key={i} onClick={toggleHamburger}>
              {item.link && (
                <Link href={item.link}>
                  <div className={styles.menuItemContainer}>
                    {item.image && (
                      <Image priority src={item.image} alt="" height={36} width={36} />
                    )}
                    {item.name}
                  </div>
                </Link>
              )}
              {item.url && (
                <a href={item.url} target="_blank">
                  <div className={styles.menuItemContainer}>
                    {item.image && (
                      <Image priority src={item.image} alt="" height={36} width={36} />
                    )}
                    {item.name}
                  </div>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Navigation
