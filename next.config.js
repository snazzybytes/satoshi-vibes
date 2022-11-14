module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: "/bitcoin",
        destination: "https://bitcoin.org/bitcoin.pdf",
        permanent: true,
      },
      {
        source: "/whitepaper",
        destination: "https://bitcoin.org/bitcoin.pdf",
        permanent: true,
      },
      {
        source: "/view-source",
        destination: "https://github.com/snazzybytes",
        permanent: true,
      },
    ]
  },
}
