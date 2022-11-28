import { CustomApiError } from "@/interfaces/pricedata"

export const apifetcher = async (url: string) => {
  return fetch(url).then(res => {
    if (!res.ok) {
      const error = new CustomApiError("An error occurred while fetching the data.")
      // Attach extra info to the error object .
      // error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  })
}
