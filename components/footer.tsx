import Image from "next/future/image"
import Link from "next/link"
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={`${styles.imageContainer}`}>
        <Image
          priority
          src="/btcforever.png"
          height={164 / 5}
          width={537 / 5}
          alt="Bitcoin Orange Pill Forever"
        />
      </div>
      <>
        <p>2022 SnazzyBytes</p>
        <a href="https://github.com/snazzybytes/satoshi-vibes" target="_blank">
          <Image priority src="/icons/code.svg" height={36} width={36} alt="Code tag icon" />
        </a>
        <p>
          Made with ❤️ by{" "}
          <a href="https://twitter.com/lukeonchain_" target="_blank">
            LukeOnchain
          </a>
        </p>
      </>
    </footer>
  )
}

export default Footer
