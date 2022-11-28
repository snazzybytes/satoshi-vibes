import useSWR from "swr"
import Image from "next/image"
import { CoinbaseResp, CustomApiError } from "@/interfaces/pricedata"
import { apifetcher } from "@/lib/apiutils"
import styles from "./header.module.css"

const SATS_PER_BTC = 100000000 // 100 million satoshis per bitcoin (sats-per-usd)
const REFRESH_INTERVAL_MILLIS = 60000

const PricePanel = () => {
  //  btc price fetcher
  const { data: coinbaseData, error: error } = useSWR<CoinbaseResp, CustomApiError>(
    "https://api.coinbase.com/v2/prices/spot?currency=USD",
    apifetcher,
    {
      refreshInterval: REFRESH_INTERVAL_MILLIS,
      revalidateOnFocus: false, // disable repeat api calls, use interval instead
    }
  )
  //  mempool.space block height tip fetcher
  const { data: mempoolData, error: mempoolerror } = useSWR(
    "https://mempool.space/api/blocks/tip/height",
    apifetcher,
    {
      refreshInterval: REFRESH_INTERVAL_MILLIS,
      revalidateOnFocus: false, // disable repeat api calls, use interval instead
    }
  )
  //  error handling
  if (error) {
    return (
      <div className={styles.pricePanel}>
        {/* <p>{error.info.errors[0]?.message}</p> */}
        <p>🍊💊 price data error...</p>
      </div>
    )
  }
  //  wait until both APIs responded (coinbase + mempool)
  if (!coinbaseData || !mempoolData) {
    return (
      <div className={styles.pricePanel}>
        <p>🍊💊 Loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.pricePanel}>
      {/* btc price */}
      <Image priority src={"/icons/btccircle.svg"} alt="Bitcoin icon" height={28} width={28} />
      <p>${Number(coinbaseData.data.amount).toFixed(0)}</p>
      {/* sats per fiat */}
      <Image priority src={"/icons/sats.svg"} alt="Satoshi v2 icon" height={28} width={28} />{" "}
      <p>{Number(SATS_PER_BTC / Number(coinbaseData.data.amount)).toFixed(0)}/$</p>
      {/* block height (tip) */}
      <Image priority src={"/icons/block.svg"} alt="Block icon" height={28} width={28} />{" "}
      <p>{mempoolData}</p>
    </div>
  )
}

export default PricePanel
