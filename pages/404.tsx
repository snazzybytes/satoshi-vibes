import utilStyles from "@/styles/utils.module.css"
import styles from "@/styles/404.module.css"
import Layout from "@/components/layout"
import Image from "next/future/image"

const Custom404 = () => {
  return (
    <Layout homeButton>
      <div className={`${styles.errorPanel} ${utilStyles.boxShadow}`}>
        <h1 className={utilStyles.headingLg}>404 | Page Not Found</h1>
        <Image
          priority
          src="/satoshifed.png"
          className={styles.imageWrapper}
          height={615}
          width={615}
          alt="Satoshi Nakamoto retired in 2010."
        />
        <h1 className={utilStyles.headingLg}>Satoshi retired in 2010</h1>
      </div>
    </Layout>
  )
}

export default Custom404
