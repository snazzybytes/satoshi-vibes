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
}
