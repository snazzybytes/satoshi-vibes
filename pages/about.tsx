import Link from "next/link"
import Head from "next/head"
import Layout from "@/components/layout"
import styles from "@/styles/about.module.css"
import utilStyles from "@/styles/utils.module.css"

const About = () => {
  return (
    <Layout homeButton genericHeroImg>
      <Head>
        <title>About SatoshiVibes.com</title>
      </Head>
      <>
        <div
          className={`${styles.aboutPanel} ${utilStyles.breakWithHyphens} ${utilStyles.boxShadow}`}
        >
          <header className={styles.header}>
            <h1 className={utilStyles.heading2Xl}>About</h1>
          </header>
          <p>
            Welcome to Satoshi Vibes, the "Satoshi Nakamoto" quote wiki. If you've made it here, you
            must be in the middle of your Bitcoin journey. As you go down deeper the infinite rabbit
            hole 🐇🕳, you will be curious to read up on what Satoshi was saying on cypherpunk forums
            back in the years of 2008, 2009, and 2010 before he disappeared forever. It's nice to
            get a taste of how it all started and learn about the impetus for the ideas that
            culminated in creation of Bitcoin aka hardest money in the world. On the home page you
            will find 24 quote categories to choose from. Each category is sorted by published date
            in descending order (for now). Let this be a quick reference for Satoshi's quotes you
            can pull up on your mobile/tablet/desktop as you orange pill your family and friends.
          </p>
        </div>

        <div
          className={`${styles.aboutPanel} ${utilStyles.breakWithHyphens} ${utilStyles.boxShadow}`}
        >
          <h2 className={utilStyles.headingLg}>Pleb Movement</h2>
          <p>
            Pleb is a state of mind. Plebs come from all walks of life and form socioeconomic immune
            system that defends freedom and Bitcoin from all attacks. Don't trust verify! Stay
            humble and stack sats! HODLujah 🙏
          </p>
        </div>

        <div
          className={`${styles.aboutPanel} ${utilStyles.breakWithHyphens} ${utilStyles.boxShadow}`}
        >
          <h2 className={utilStyles.headingLg}>Motivation</h2>
          <p>
            I quickly put this site together while sitting home one weekend and exploring{" "}
            <Link href="https://nextjs.org/">NextJS</Link>. I work as a software engineer in
            e-commerce world dealing with backend systems in large enteprise setting and don't get
            to play with the frontend dev that much. However I felt compelled to provide some
            educational value to the world while I'm at it. There is always a new wave of bitcoin
            plebs awakening, ready to step inside the mind of Satoshi once they truly realize that
            something is wrong with the fiat world we live in 💸🪦. The least I could do is pay
            homage to Bitcoin and spread its ethos out into the universe (inspired by{" "}
            <a href="https://nakamotoinstitute.org/" target="_blank">
              NakamototInstitute.org
            </a>
            ).
          </p>
        </div>

        <div
          className={`${styles.aboutPanel} ${utilStyles.breakWithHyphens} ${utilStyles.boxShadow}`}
        >
          <h2 className={utilStyles.headingLg}>Contribute</h2>
          <p>
            The site is fully open source, just like everything I used to put it together (credits
            on Github). If you are a dev and want to add more pages, Bitcoin resources or learning
            materials, improve the NextJS layout or react components, or just spice things up and
            make this site a lot cooler for all the plebs - you are very welcome to{" "}
            <a href="https://github.com/snazzybytes/satoshi-vibes" target="_blank">
              put up a PR
            </a>
            &nbsp;🚀. Or contact me on telegram{" "}
            <a href="https://t.me/lukeonchain" target="_blank">
              @Lukeonchain
            </a>
          </p>
        </div>
      </>
    </Layout>
  )
}

export default About
