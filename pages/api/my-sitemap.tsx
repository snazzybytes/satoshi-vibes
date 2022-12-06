import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import { getAllQuoteIds, getAllQuoteCategories } from "@/lib/quotes"
import { NextApiRequest, NextApiResponse } from "next"

type SitemapUrls = {
  url: string
  changefreq: string
  priority: number
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const links: SitemapUrls[] = []
  //  dynamic pages - quote categories
  getAllQuoteCategories().map(cat => {
    links.push({
      url: `/categories/${cat.slug}`,
      changefreq: "monthly",
      priority: 0.7,
    })
  })
  //  dynamic pages - Satoshi quotes
  getAllQuoteIds().map(quote => {
    links.push({
      url: `/quotes/${quote.params.id}`,
      changefreq: "monthly",
      priority: 0.5,
    })
  })
  //  static pages
  const pages = ["/", "/about"]
  pages.map(url => {
    links.push({
      url,
      changefreq: "monthly",
      priority: 1.0,
    })
  })
  //  stream to write xml string
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` })
  res.writeHead(200, { "Content-type": "application/xml" })
  const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(data =>
    data.toString()
  )
  res.end(xmlString)
}
