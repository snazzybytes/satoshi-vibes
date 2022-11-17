import Head from "next/head"
import Link from "next/link"
import { GetStaticProps, GetStaticPaths } from "next"
import Layout, { siteTitle } from "@/components/layout"
import PublishedDate from "@/components/publishedDate"
import { getPathsForQuoteCategories, getQuotesForCategory } from "@/lib/quotes"
import { QuoteCategoryItems } from "@/interfaces/quotedata"
import styles from "@/styles/quotes.module.css"
import utilStyles from "@/styles/utils.module.css"

type Props = {
  quoteCategoryItems: QuoteCategoryItems
}

export default function Category({ quoteCategoryItems }: Props) {
  return (
    <Layout genericHeroImg backButton>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={`${styles.stagePanel} ${utilStyles.boxShadow} ${utilStyles.headingMd}`}>
        <div>
          <h2 className={utilStyles.headingLg}>{quoteCategoryItems.categoryName}</h2>
          <ul className={utilStyles.list}>
            {quoteCategoryItems.quoteData.map(({ id, title, date, content, category, medium }) => (
              <li className={`${utilStyles.listItem}`} key={id}>
                <Link
                  href={`/quotes/${id}`}
                  className={`${utilStyles.truncate} ${utilStyles.breakWithHyphens}`}
                >
                  {content}
                </Link>
                <PublishedDate dateStr={date} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

// fetches full quote data for given id
export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const quoteCategoryItems = getQuotesForCategory(params.slug)
  return {
    props: {
      quoteCategoryItems,
    },
  }
}

//  Since dynamic-routes are being utilized '[id]',
//  getStaticPaths() needs to be implemented.
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPathsForQuoteCategories()
  return {
    paths,
    fallback: false,
  }
}
