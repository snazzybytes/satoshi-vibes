import Image from "next/image"
import styles from "./header.module.css"
import utilStyles from "@/styles/utils.module.css"

const HamburgerMenu = () => (
  <button className={styles.hamburger}>
    <HamburgerIcon />
  </button>
)

const HamburgerIcon = () => (
  <Image
    priority
    src="/icons/menu.svg"
    className={utilStyles.borderCircle}
    height={36}
    width={36}
    alt="Hamburger Menu"
    // style={{ objectFit: "contain" }}
  />
)
export default HamburgerMenu
