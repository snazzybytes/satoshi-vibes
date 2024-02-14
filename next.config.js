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
      },
      {
        source: "/.well-known/nostr.json",
        destination: "/api/nip5",
      },
    ]
  },
  /* favorite url redirects - custom fun names */
  async redirects() {
    return [
      // Nostr protocol
      // {
      //   source: "/nostr",
      //   destination: "nostr:npub138guayty78ch9k42n3uyz5ch3jcaa3u390647hwq0c83m2lypekq6wk36k",
      //   permanent: true,
      //   basePath: false,
      // },
      {
        source: "/NostrPile",
        destination: "https://nostr.build/creators/creator/?user=205",
        permanent: true,
      },
      {
        source: "/TheNostrPackSignal",
        destination:
          "https://signal.art/addstickers/#pack_id=b964fcc58f917f7e6cf09230afaf3b71&pack_key=21357a12cd0fad97a9c28e060d665303d23b656d5b362315fa32830878a7938f",
        permanent: true,
      },
      {
        source: "/TheNostrPackTelegram",
        destination: "https://t.me/addstickers/TheNostrPack",
        permanent: true,
      },
      {
        source: "/NostrFAQ",
        destination: "https://uselessshit.co/resources/nostr/",
        permanent: true,
      },
      // btc+ln
      {
        source: "/bitcoin",
        destination: "/bitcoin.pdf",
        permanent: true,
      },
      {
        source: "/whitepaper",
        destination: "/bitcoin.pdf",
        permanent: true,
      },
      {
        // additional external pdf in case file missing lol
        source: "/whitepaper-mirror",
        destination: "https://bitcoin.org/bitcoin.pdf",
        permanent: true,
      },
      {
        source: "/bitcoin.conf",
        destination: "https://jlopp.github.io/bitcoin-core-config-generator/",
        permanent: true,
      },
      {
        source: "/cypherpunks",
        destination: "/docs/cypherpunkmanifesto.txt",
        permanent: true,
      },
      {
        source: "/manifesto",
        destination: "/docs/cypherpunkmanifesto.txt",
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
      // referrals
      {
        source: "/foldapp",
        destination: "https://use.foldapp.com/r/LUKEONCHAIN",
        permanent: true,
      },
      {
        source: "/proton",
        destination: "https://pr.tn/ref/QSQS1NSA1HRG",
        permanent: true,
      },
      {
        source: "/coinkite",
        destination: "https://store.coinkite.com/promo/63FA42CEC732C90FEC8D",
        permanent: true,
      },
      {
        source: "/coldcard",
        destination: "https://store.coinkite.com/promo/63FA42CEC732C90FEC8D",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // matching all NOSTR "/.well-known" related routes (nip5/lnurlp)
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
