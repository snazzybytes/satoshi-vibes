import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { GetStaticProps } from "next"
import { QuoteCategory } from "@/interfaces/quotedata"
import { getAllQuoteCategories } from "@/lib/quotes"
import Layout, { siteTitle } from "@/components/layout"
import utilStyles from "@/styles/utils.module.css"
import styles from "@/styles/categories.module.css"

export default function Categories({ allCategories }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h2 className={styles.headingLg}>choose category</h2>
      <div className={styles.caretContainter}>
        <Image
          priority
          src="/icons/caretdown.svg"
          className={`${styles.blob}`}
          height={24}
          width={24}
          alt=""
        />
        <Image
          priority
          src="/icons/caretdown.svg"
          className={`${styles.blob}`}
          height={24}
          width={24}
          alt=""
        />
        <Image
          priority
          src="/icons/caretdown.svg"
          className={`${styles.blob}`}
          height={24}
          width={24}
          alt=""
        />
      </div>
      <div className={`${styles.categoryPanel} ${utilStyles.boxShadow}`}>
        <div className={`${styles.categoriesContainer}`}>
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
