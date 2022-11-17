import useSWR from "swr"
import Image from "next/image"
import { CoinbaseResp } from "@/interfaces/pricedata"
import styles from "./header.module.css"

// error handling : custom error subclass to set additional fields
class ErrorSubclass extends Error {
  status?: number
  info?: any
}

const fetcher = async (url: string) => {
  return fetch(url).then(res => {
    if (!res.ok) {
      const error = new ErrorSubclass("An error occurred while fetching the data.")
      // Attach extra info to the error object .
      // error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  })
}

const SATS_PER_BTC = 100000000 // 100 million satoshis per bitcoin (sats-per-usd)
const REFRESH_INTERVAL_MILLIS = 60000

const PricePanel = () => {
  const { data, error } = useSWR<CoinbaseResp, ErrorSubclass>(
    "https://api.coinbase.com/v2/prices/spot?currency=USD",
    fetcher,
    {
      refreshInterval: REFRESH_INTERVAL_MILLIS,
      revalidateOnFocus: false, // disable to prevent repeated coinbase api calls
    }
  )

  if (error) {
    return (
      <div className={styles.pricePanel}>
        {/* <p>{error.info.errors[0]?.message}</p> */}
        <p>🍊💊</p>
      </div>
    )
  }
  if (!data) {
    return (
      <div className={styles.pricePanel}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.pricePanel}>
      {/* btc price */}
      <Image priority src={"/icons/btccircle.svg"} alt="Bitcoin icon" height={28} width={28} />
      <p>${Number(data.data.amount).toFixed(0)}</p>
      {/* sats per fiat */}
      <Image priority src={"/icons/sats.svg"} alt="Satoshi v2 icon" height={28} width={28} />{" "}
      {Number(SATS_PER_BTC / Number(data.data.amount)).toFixed(0)}/$
    </div>
  )
}

export default PricePanel
