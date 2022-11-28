export type CoinbaseResp = {
  data: PriceData
}

export type PriceData = {
  base: string
  currency: string
  amount: string
}

// error handling : custom error subclass to propagate additional fields
export class CustomApiError extends Error {
  status?: number
  info?: any

  constructor(message: string) {
    super(message)

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomApiError.prototype)
  }

  getErrorMessage() {
    return "Something went wrong: " + this.message
  }
}
