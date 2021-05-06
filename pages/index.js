import homeStyles from '../styles/Home.module.css'
import QuickQuote from '../components/QuickQuote'
import homeData from '../components/TextData'
import {AiFillDollarCircle} from 'react-icons/ai'
import {FaTruckLoading} from 'react-icons/fa'
import {RiTimeFill} from 'react-icons/ri'
import {FaPhoneAlt} from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'

const Section1 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section1Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section1}>
        <div className={homeStyles.section1Left}>
          <ul>
            <li><h1>{homeData.section1.title}</h1></li>
            <li className={homeStyles.phone}><Link href='tel:(855) 780-3061'><div><FaPhoneAlt />(855) 780-3061</div></Link></li>
          </ul>
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
        <div>
          <AiFillDollarCircle className={homeStyles.section2Icons}/>
          <h3>{homeData.section2.h3}</h3>
        </div>
        <div>
          <RiTimeFill className={homeStyles.section2Icons}/>
          <h3>{homeData.section2.h1}</h3>
        </div>
        <div>
          <FaTruckLoading className={homeStyles.section2Icons}/>
          <h3>{homeData.section2.h2}</h3>
        </div>
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
        <div>
          <img src="/assets/event.svg" alt="even_pic" />
          <h3>{homeData.section3.h1}</h3>
          <p>{homeData.section3.p1}</p>
        </div>
        <div>
          <img src="/assets/construction.svg" alt="event_pic" />
          <h3>{homeData.section3.h2}</h3>
          <p>{homeData.section3.p2}</p>
        </div>
        <div>
          <img src="/assets/renovation.svg" alt="event_pic" />
          <h3>{homeData.section3.h3}</h3>
          <p>{homeData.section3.p3}</p>
        </div>
        <div>
          <img src="/assets/relief.svg" alt="even_pic" />
          <h3>{homeData.section3.h4}</h3>
          <p>{homeData.section3.p4}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

const Home = () => {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="-7RA9p2zau4hrs82YsLlEwn89woYgVoNsZ6Nxj92qHw" />
      </Head>
      <Section1 />
      <Section2 />
      <Section3 />
    </>
  )
}

export default Home
