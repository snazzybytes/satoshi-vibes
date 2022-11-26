import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { getTitle } from "./contentutils"
import { QuoteCategory, QuoteCategoryItems, QuoteData } from "@/interfaces/quotedata"

const quotesDir = path.join(process.cwd(), "quotes")

export function getSortedQuotesData(): QuoteData[] {
  // Get file names under /quotes
  const fileNames = fs.readdirSync(quotesDir)
  const allQuotesData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "")

    // Read markdown file as string
    const fullPath = path.join(quotesDir, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the quote metadata section
    const matterResult = matter(fileContents)
    const quoteText = matterResult.content
    const title = getTitle(matterResult.content)

    // Combine the data with id and title
    return {
      id,
      title,
      content: quoteText,
      ...matterResult.data,
    }
  })

  return allQuotesData.sort(sortedDesc)
}

export function getAllQuoteIds() {
  const fileNames = fs.readdirSync(quotesDir)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    }
  })
}

export async function getQuoteData(id: string) {
  const fullPath = path.join(quotesDir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the quote metadata section
  const matterResult = matter(fileContents)

  const title = getTitle(matterResult.content)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    title,
    contentHtml,
    ...matterResult.data,
  }
}

// ✅ Sort in Descending order (latest to oldest)
const sortedDesc = (quoteA: QuoteData, quoteB: QuoteData) => {
  return Date.parse(quoteB.date) - Date.parse(quoteA.date)
}

export function getPathsForQuoteCategories() {
  const filePath = path.join(process.cwd(), "data/quotecategories.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const categories: QuoteCategory[] = JSON.parse(jsonData)
  return categories.map(category => {
    return {
      params: {
        slug: category.slug,
        name: category.name,
      },
    }
  })
}

export function getAllQuoteCategories() {
  const filePath = path.join(process.cwd(), "data/quotecategories.json")
  const jsonData = fs.readFileSync(filePath, "utf-8")
  const categoriesObject: QuoteCategory[] = JSON.parse(jsonData)
  return categoriesObject
}

export function getQuotesForCategory(category: string): QuoteCategoryItems {
  const quoteData = getSortedQuotesData().filter(quote => quote.category.includes(category))
  const categoryName = getAllQuoteCategories()
    .filter(cat => cat.slug === category)
    .at(0).name
  return {
    quoteData,
    categoryName,
  }
}
