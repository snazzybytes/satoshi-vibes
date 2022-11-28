import Image from "next/image"
import { useState } from "react"
import { stripHtmlTags } from "@/lib/contentutils"
import { useEffect } from "react"
import styles from "@/styles/quotes.module.css"
import utilStyles from "@/styles/utils.module.css"

const ClipboardCopyButton = ({ divQuoteRef, date }) => {
  const [effect, setEffect] = useState(false)
  const [copyStatus, setCopyStatus] = useState("")
  const [isCopySupported, setIsCopySupported] = useState(false)

  useEffect(() => {
    setIsCopySupported(window.isSecureContext && "clipboard" in navigator)
  }, [])

  async function copyToClipboard(copyText: string) {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(
        stripHtmlTags(copyText + " - Satoshi Nakamoto (" + date + ")")
      )
    } else {
      //  legacy copy support
      document.execCommand("copy", true, copyText)
    }
    // If successful, update the status value
    setEffect(true)
    setCopyStatus("Copied!")
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // asynchronously call copyToClipboard
    copyToClipboard(divQuoteRef.current.innerHTML)
      .then(() => {
        setTimeout(() => {
          setEffect(false)
          setCopyStatus("")
        }, 1500)
      })
      .catch(err => {
        console.log(err)
        setEffect(false)
      })
  }

  return (
    //   show copy button only if supported (clipboard only works for HTTPS)
    isCopySupported && (
      <div className={`${styles.copyButtonWrapper}`}>
        <div className={utilStyles.textCenter}>{copyStatus}</div>
        <div className={`${effect && styles.copyEffect}`} onClick={handleCopyClick}>
          <Image priority src={"/icons/copy.svg"} alt="Copy icon" height={36} width={36} />
        </div>
      </div>
    )
  )
}

export default ClipboardCopyButton
