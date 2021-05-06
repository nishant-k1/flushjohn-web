import homeStyles from '../styles/Home.module.css'
import homeData from '../components/TextData'

const Testimonial = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.section4Section}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.section4}>
          <h2>What do our customers say</h2>
          <div className={homeStyles.testimonials}>
            <div>
              <img src="/assets/testimony2.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.section4.h1}</h3>
              <p>{homeData.section4.p1}</p>
            </div>
            <div>
              <img src="/assets/testimony1.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.section4.h2}</h3>
              <p>{homeData.section4.p2}</p>
            </div>
            <div>
              <img src="/assets/testimony2.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.section4.h3}</h3>
              <p>{homeData.section4.p3}</p>
            </div>
            <div>
              <img src="/assets/testimony2.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.section4.h4}</h3>
              <p>{homeData.section4.p4}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default Testimonial