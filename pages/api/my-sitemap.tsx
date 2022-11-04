import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import { getAllQuoteIds } from "@/lib/quotes"

import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // individual quote links
  const links = []
  getAllQuoteIds().map(quote => {
    links.push({
      url: `/quotes/${quote.params.id}`,
      changefreq: "daily",
      priority: 0.9,
    })
  })

  // other pages
  const pages = ["/categories", "/quotes", "/about"]
  pages.map(url => {
    links.push({
      url,
      changefreq: "daily",
      priority: 0.9,
    })
  })

  //  stream to write
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` })

  res.writeHead(200, { "Content-type": "application/xml" })

  const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(data =>
    data.toString()
  )

  res.end(xmlString)
}
