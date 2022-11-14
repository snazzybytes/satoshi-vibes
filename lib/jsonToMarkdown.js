/**
 * Utilities to convert JSON object array to individual markdown files per each object.
 * Reason: markdown is useful for building dynamic-pages in NextJS
 */
const transformAndWriteToFile = require("json-to-frontmatter-markdown").default
const path = require("path")
const fs = require("fs")
const JSON_DATA_DIR = "data"
const JSON_FILE = "quotes.json"

function readFile() {
  //Find the absolute path of the data directory
  const jsonFile = path.join(process.cwd(), JSON_DATA_DIR, JSON_FILE)
  //Read the json data file quotes.json
  const fileContents = fs.readFileSync(jsonFile, "utf8")
  let quotes = JSON.parse(fileContents)

  //TODO - sort first, before creating MD files
  quotes.sort()
  //Return the content of the data file in json format
  return quotes
}

function createQuote(quote, index, path = "./quotes") {
  let frontmatterArray = [
    { category: quote.category },
    { medium: quote.medium },
  ]
  //  add additional
  if (!isNaN(quote.post_id)) {
    frontmatterArray.push({ post_id: parseInt(quote.post_id) })
  }
  if (quote.date) {
    frontmatterArray.push({ date: quote.date })
  }

  transformAndWriteToFile({
    frontmatterMarkdown: {
      frontmatter: frontmatterArray,
      body: quote.text,
    },
    path,
    fileName: `${index}.md`,
  })
}

function convertJsonToMarkdown() {
  let quotes = readFile()
  quotes.forEach((quote, i) => {
    createQuote(quote, i)
  })
}

convertJsonToMarkdown()
