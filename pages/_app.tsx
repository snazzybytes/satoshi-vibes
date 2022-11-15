import type { AppProps } from "next/app"
import { Analytics } from "@vercel/analytics/react"
import { AnimatePresence } from "framer-motion"
import "@/styles/global.css"

export default function App({ Component, pageProps, router }: AppProps) {
  return (
      <>
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
    <Analytics />
    </>
  )
}

// Manually disable console.log() in production (simpler/arguably more elegant than libs)
if (process.env.NODE_ENV === "production") {
  console.log = function () {}
}
