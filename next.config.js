module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  /* redirect toogle crawler to dynamically created sitemap */
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/my-sitemap",
      },
    ]
  },
  /* favorite url redirects - custom fun names */
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
  async headers() {
    return [
      {
        // matching all NOSTR related routes
        source: "/.well-known/nostr.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" }
        ],
      },
    ]
  },
}
