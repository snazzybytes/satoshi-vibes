module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  /* redirect google crawler to dynamically created sitemap */
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/my-sitemap",
      },
      {
        source: "/.well-known/lnurlp/lukeonchain",
        destination: "/api/lukeonchain",
      }
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
      {
        source: "/tipjar",
        destination: "https://uselessshit.co/tip-jar/lukeonchain",
        permanent: true,
      },
      // plebsites
      {
        source: "/wtf1971",
        destination: "https://wtfhappenedin1971.com/",
        permanent: true,
      },
      {
        source: "/usdebt",
        destination: "https://usdebt.wtf/",
        permanent: true,
      },
      {
        source: "/nostr",
        destination: "https://uselessshit.co/resources/nostr/",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // matching all NOSTR nip5 (".well-known") related routes
        source: "/.well-known/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
}
