import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { GetStaticProps, GetStaticPaths } from "next"
import { useRef } from "react"
import Layout from "@/components/layout"
import ClipboardCopyButton from "@/components/copy"
import PublishedDate from "@/components/publishedDate"
import { QuoteData } from "@/interfaces/quotedata"
import { getAllQuoteIds, getQuoteData } from "@/lib/quotes"
import styles from "@/styles/quotes.module.css"
import utilStyles from "@/styles/utils.module.css"

// getStaticProps() makes 'quoteData' accessible via props
type Props = {
  quoteData: QuoteData
}
export default function Quote({ quoteData }: Props) {
  //  split into multiple category strings
  const categories: string[] = quoteData.category.split(",").map(element => element.trim())
  //  ref to access quote text value
  const divQuoteRef = useRef(null)

  return (
    <Layout genericHeroImg backButton>
      <Head>
        <title>{quoteData.title}</title>
      </Head>
      <div className={`${styles.article} ${utilStyles.breakWithHyphens} ${utilStyles.boxShadow}`}>
        <ClipboardCopyButton divQuoteRef={divQuoteRef} date={quoteData.date} />
        <h2
          className={`${utilStyles.headingLg}  ${utilStyles.truncateTitle} ${utilStyles.textCenter} `}
        >
          {quoteData.title}
        </h2>
        <div className={utilStyles.lightText}>
          <PublishedDate dateStr={quoteData.date} />
        </div>
        <div
          ref={divQuoteRef}
          className={utilStyles.headingMd}
          dangerouslySetInnerHTML={{ __html: quoteData.contentHtml }}
        />
        <div className={`${styles.quoteTags} ${utilStyles.lightText}`}>
          <Image priority src={"/icons/tag.svg"} alt="Category tag icon" height={24} width={24} />
          category:&nbsp;
          {categories.map((cat, index) => (
            <div key={cat + index} className={styles.quoteTag}>
              <Link href={`/categories/${cat}`} key={index}>
                {" " + cat}
              </Link>
              {/* append comma except for last one */}
              {index < categories.length - 1 && ","}
            </div>
          ))}{" "}
          <div className={styles.quoteTag}>
            <Image priority src={"/icons/tag.svg"} alt="Source tag icon" height={24} width={24} />
            source:
            {" " + quoteData.medium}
          </div>
        </div>
      </div>
    </Layout>
  )
}

type Params = {
  params: {
    id: string
  }
}

// fetches full quote data for given id
export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const quoteData = await getQuoteData(params.id)
  return {
    props: {
      quoteData,
    },
  }
}

//  Since dynamic-routes are being utilized '[id]',
//  getStaticPaths() needs to be implemented.
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllQuoteIds()
  return {
    paths,
    fallback: false,
  }
}
