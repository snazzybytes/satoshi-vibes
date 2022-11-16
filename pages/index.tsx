import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { GetStaticProps } from "next"
import { QuoteCategory } from "@/interfaces/quotedata"
import { getAllQuoteCategories } from "@/lib/quotes"
import Layout, { siteTitle } from "@/components/layout"
import utilStyles from "@/styles/utils.module.css"
import styles from "@/styles/categories.module.css"
import { motion } from "framer-motion"

export default function Categories({ allCategories }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h2 className={styles.headingLg}>choose category</h2>
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.caretContainter} key="caretContainer">
          <div className={styles.imageContainer} key="caret1">
            <Image
              priority
              src="/icons/caretdown.svg"
              className={`${styles.blob}`}
              height={24}
              width={24}
              alt=""
            />
          </div>
          <div className={styles.imageContainer} key="caret2">
            <Image
              priority
              src="/icons/caretdown.svg"
              className={`${styles.blob} `}
              height={24}
              width={24}
              alt=""
            />
          </div>
          <div className={styles.imageContainer} key="caret3">
            <Image
              priority
              src="/icons/caretdown.svg"
              className={`${styles.blob}`}
              height={24}
              width={24}
              alt=""
            />
          </div>
        </div>
      </motion.div>
      <div className={`${styles.categoryPanel} ${utilStyles.boxShadow}`} key="categoryPanel">
        <div className={`${styles.categoriesContainer}`} key="categoryContainer">
          {allCategories.map(({ name, slug }, index) => (
            <Link
              className={`${styles.categoryItem} ${styles.headingMd}`}
              href={`/categories/${slug}`}
              key={index}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

type Props = {
  allCategories: QuoteCategory[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allCategories = getAllQuoteCategories()
  return {
    props: {
      allCategories,
    },
  }
}
