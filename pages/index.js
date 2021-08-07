import homeStyles from '../styles/Home.module.css'
import QuickQuote from '../components/QuickQuote'
import homeData from '../components/TextData'
import {AiFillDollarCircle} from 'react-icons/ai'
import {FaTruckLoading, FaPhoneAlt} from 'react-icons/fa'
import {GiVacuumCleaner} from 'react-icons/gi'
import {RiTimeFill} from 'react-icons/ri'
import { Event } from "../lib/analytics";
import {NextSeo} from 'next-seo'


const SEO = {
  title: 'Rent A Porta - Home | porta potty rental california | porta potty rental near me | porta john rental New Jersey | portable restroom rental | rent a toilet',
}


const Section1 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section1Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section1}>
        <ul className={homeStyles.section1Left}>
          <li><h1>{homeData.section1.title}</h1></li>
          <li className={homeStyles.phone}>
            <a href='tel: +1 (855) 780-3061' onClick={ (e) => { Event("Request quote", "Mobile Phone Call", "MPC")}} >
              <div>
                <FaPhoneAlt />
                (855) 780-3061
              </div>
            </a>    
            <img className={homeStyles.discount} src="assets/discount.gif" alt="https://www.rentaporta.com/" />
          </li>
        </ul>
        <div className={homeStyles.section1Right}>
          <img className={homeStyles.gifImg} src="assets/discount.gif" alt="https://www.rentaporta.com/" />
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
        <h2>{homeData.section2.heading}</h2>
        <div className={homeStyles.benefitsDiv}>
          <div className={homeStyles.wrapper}>
            <AiFillDollarCircle className={homeStyles.section2Icons}/>
            <h3>{homeData.section2.h3}</h3>
            <p>{homeData.section2.p1}</p>
          </div>
          <div className={homeStyles.wrapper}>
            <RiTimeFill className={homeStyles.section2Icons}/>
            <h3>{homeData.section2.h1}</h3>
            <p>{homeData.section2.p2}</p>
          </div>
          <div className={homeStyles.wrapper}>
            <FaTruckLoading className={homeStyles.section2Icons}/>
            <h3>{homeData.section2.h2}</h3>
            <p>{homeData.section2.p3}</p>
          </div>
          <div className={homeStyles.wrapper}>
            <GiVacuumCleaner className={homeStyles.section2Icons}/>
            <h3>{homeData.section2.h4}</h3>
            <p>{homeData.section2.p4}</p>
          </div>
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
      <h2 className={homeStyles.section3h2}>Our Services</h2>
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

const Section4 = (props) => {
  return(
    <div className={`${homeStyles.section} ${homeStyles.section4Section}`}>
      <div className={homeStyles.container}>
        <h2 className={homeStyles.section4h2}>{props.title}</h2>
        <div className={homeStyles.section4}>
          <div className={homeStyles.list}>
            {
              props.list1.map((element, index) => <p key={index}>{element}</p>)
            }
          </div>
          <div className={homeStyles.list}>                
            {
              props.list2.map((element, index) => <p key={index}>{element}</p>)
            }
          </div>
          <div className={homeStyles.list}>
            {
              props.list3.map((element, index) => <p key={index}>{element}</p>)
            }
          </div>
            <div className={homeStyles.list}>
              {
                  props.list4.map((element, index)=> <p className='list-item' key={index}>{element}</p>)
              }

            </div>
          </div>
      </div>
    </div>
    
  )
}
const Home = () => {
  return (
    <>
      <NextSeo {...SEO}/>
      <Head>
        <meta keywords={`porta potty rental in california, porta potty rental near me, porta john rental in New Jersey, portable restroom rental in Indiana, rent a toilet in Michigan`} />
      </Head>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 {...homeData.sectionLocation}/>
    </>
  )
}

export default Home
