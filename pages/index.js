import homeStyles from '../styles/Home.module.css'
import QuickQuote from '../components/QuickQuote'
import homeData from '../components/TextData'
import {AiFillDollarCircle} from 'react-icons/ai'
import {FaTruckLoading, FaPhoneAlt} from 'react-icons/fa'
import {GiVacuumCleaner} from 'react-icons/gi'
import {RiTimeFill} from 'react-icons/ri'
import Link from 'next/link'

const Section1 = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section1Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section1}>
        <div className={homeStyles.section1Left}>
          <ul>
            <li><h1>{homeData.section1.title}</h1></li>
            <li className={homeStyles.phone}>
              <Link href='tel:(855) 780-3061'><div><FaPhoneAlt />(855) 780-3061</div></Link>          
              <img className={homeStyles.discount} src="assets/discount.gif" alt="https://www.rentaporta.com/" />
            </li>
          </ul>
        </div>
        <div className={homeStyles.section1Right}>
          <img src="assets/discount.gif" alt="https://www.rentaporta.com/" />
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
          <div>
            <AiFillDollarCircle className={homeStyles.section2Icons}/>
            <h3>{homeData.section2.h3}</h3>
            <p>{homeData.section2.p1}</p>
          </div>
          <div>
            <RiTimeFill className={homeStyles.section2Icons}/>
            <h3>{homeData.section2.h1}</h3>
            <p>{homeData.section2.p2}</p>
          </div>
          <div>
            <FaTruckLoading className={homeStyles.section2Icons}/>
            <h3>{homeData.section2.h2}</h3>
            <p>{homeData.section2.p3}</p>
          </div>
          <div>
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
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 {...homeData.sectionLocation}/>
    </>
  )
}

export default Home
