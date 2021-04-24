import Head from 'next/head'
import homeStyles from '../styles/Home.module.css'
import QuickQuote from '../components/QuickQuote'
import section1Data from '../components/HomeData'

const Section1 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section1Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section1}>
        <div className={homeStyles.section1Left}>
          <h1>{section1Data.title}</h1>
        </div>
        <div className={homeStyles.section1Right}>
          <QuickQuote />
        </div>
      </div>
    </div>
  </div>
  )
}

const Section2 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section2Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section2}>
          <h1>This is sction</h1>
      </div>
    </div>
  </div>
  )
}

const Section3 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section3Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section3}>
          <h1>This is sction</h1>
      </div>
    </div>
  </div>
  )
}

const Section4 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section4Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section4}>
          <h1>This is sction</h1>
      </div>
    </div>
  </div>
  )
}

const Section5 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section5Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section5}>
          <h1>This is sction</h1>
      </div>
    </div>
  </div>
  )
}
const Home = () => {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </>
  )
}

export default Home
