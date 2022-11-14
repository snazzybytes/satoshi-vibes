// Index Signatures in TypeScript ([key: string]: any): https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
// usage: import { QuoteData } from 'path/to/interfaces';

/**
 * Type used throughout pages in getStaticProps/getStaticPaths
 */
export type QuoteData = {
  id: string
  title?: string
  contentHtml?: string
  content?: string
  date?: string
  category?: string
  [key: string]: any
}

export type QuoteCategory = {
  name: string
  slug: string
}

export type QuoteCategoryItems = {
  quoteData: QuoteData[]
  categoryName: string
}
