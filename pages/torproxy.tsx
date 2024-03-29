import utilStyles from "@/styles/utils.module.css"
import styles from "@/styles/torproxy.module.css"
import Layout from "@/components/layout"
import Image from "next/image"

const TorProxy = () => {
  return (
    <Layout bottomHomeButton>
      <div
        className={`${styles.torPanel} ${utilStyles.breakWithHyphens} ${utilStyles.boxShadowRounded}`}
      >
        <h1 className={utilStyles.headingLg}>Snowflake ❄️ Tor Proxy</h1>
        <div className={styles.imageContainer}>
          <Image
            priority
            src="/mask.png"
            className={utilStyles.circleImageWrapper}
            height={766 / 3}
            width={800 / 3}
            alt="...ideas are bulletproof."
          />
        </div>
        <p>Help people from all over the world to access censored websites and applications.</p>
        <p>
          If you switch on the Snowflake below and leave the browser tab open, a user can connect
          through your new proxy!
        </p>
          <iframe
            className={`${styles.snowflakePanel} ${styles.boxShadowRounded}`}
            src="https://snowflake.torproject.org/embed.html"
            width="320"
            height="240"
          ></iframe>
      </div>
    </Layout>
  )
}

export default TorProxy
