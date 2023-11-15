import { useEffect } from "react"

// this page is used to redirect request to "nostr:npub" URI which triggers opening of native Nostr client app
const RedirectToNostrURI = () => {
  useEffect(() => {
    // Perform the client-side redirect using JavaScript
    window.location.href = "nostr:npub138guayty78ch9k42n3uyz5ch3jcaa3u390647hwq0c83m2lypekq6wk36k"
  }, [])

  return null
}

export default RedirectToNostrURI
