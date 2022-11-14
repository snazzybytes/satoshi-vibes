export type CoinbaseResp = {
  data: PriceData
}

export type PriceData = {
  base: string
  currency: string
  amount: string
}
