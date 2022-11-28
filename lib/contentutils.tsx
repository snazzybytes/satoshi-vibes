const TITLE_LENGTH = 130
/**
 * Creates title by grabbing first TITLE_LENGTH number of characters from content string.
 * Note:
 * It strips HTML tags from content string to prevent bad titles in case of markdown text with html mixed in.
 */
export function getTitle(contentString: string): string {
  return contentString.length > TITLE_LENGTH
    ? contentString.replace(/(<([^>]+)>)/gi, "").slice(0, TITLE_LENGTH)
    : contentString
}

export function stripHtmlTags(text: string): string {
  return text.replace(/(<([^>]+)>)/gi, "")
}
