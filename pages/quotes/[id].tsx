import Layout from "@/components/layout"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { GetStaticProps, GetStaticPaths } from "next"
import { QuoteData } from "@/interfaces/quotedata"
import { getAllQuoteIds, getQuoteData } from "@/lib/quotes"
import PublishedDate from "@/components/publishedDate"
import styles from "@/styles/quotes.module.css"
import utilStyles from "@/styles/utils.module.css"
import { BaseSyntheticEvent, useState } from "react"
import { useRef } from "react"
import { stripHtmlTags } from "@/lib/contentutils"

type Props = {
  quoteData: QuoteData
}

// getStaticProps() makes 'quoteData' accessible via props
export default function Quote({ quoteData }: Props) {
  const [effect, setEffect] = useState(false)
  const [copyStatus, setCopyStatus] = useState("")
  const divQuoteRef = useRef(null)
  //  split into multiple category strings
  const categories: string[] = quoteData.category.split(",").map(element => element.trim())

  async function copyToClipboard(e: BaseSyntheticEvent) {
    if (window.isSecureContext && navigator.clipboard) {
      setEffect(true)
      try {
        const quoteText = divQuoteRef.current.innerHTML
        await navigator.clipboard.writeText(
          stripHtmlTags(quoteText + " - Satoshi Nakamoto (" + quoteData.date + ")")
        )
        // preference?: do not show the whole text area selected
        // e.target.focus()
        setCopyStatus("Copied!")
        setTimeout(() => {
          setEffect(false)
          setCopyStatus("")
        }, 1500)
      } catch (e) {
        console.log(e)
        setEffect(false)
      }
    }
  }

  return (
    <Layout genericHeroImg backButton>
      <Head>
        <title>{quoteData.title}</title>
      </Head>
      <div className={`${styles.article} ${utilStyles.breakWithHyphens} ${utilStyles.boxShadow}`}>
        <div className={`${styles.copyButtonWrapper}`}>
          <div className={utilStyles.textCenter}>{copyStatus}</div>
          <div className={`${effect && styles.copyEffect}`} onClick={copyToClipboard}>
            <Image priority src={"/icons/copy.svg"} alt="Copy icon" height={36} width={36} />
          </div>
        </div>
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
