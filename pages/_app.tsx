import type { AppProps } from "next/app"
import "@/styles/global.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// Manually disable console.log() in production (simpler/arguably more elegant than libs)
if (process.env.NODE_ENV === "production") {
  console.log = function () {}
}
