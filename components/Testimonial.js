import homeStyles from '../styles/Home.module.css'
import homeData from '../components/TextData'

const Testimonial = () => {
  return (
    <div className={`${homeStyles.section} ${homeStyles.testimonialSectionSection}`}>
    <div className={homeStyles.container}>
      <div className={homeStyles.testimonialSection}>
          <h2>What do our customers say</h2>
          <div className={homeStyles.testimonials}>
            <div>
              <img src="/assets/testimony2.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.testimonialSection.h1}</h3>
              <p>{homeData.testimonialSection.p1}</p>
            </div>
            <div>
              <img src="/assets/testimony1.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.testimonialSection.h2}</h3>
              <p>{homeData.testimonialSection.p2}</p>
            </div>
            <div>
              <img src="/assets/testimony2.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.testimonialSection.h3}</h3>
              <p>{homeData.testimonialSection.p3}</p>
            </div>
            <div>
              <img src="/assets/testimony2.svg" alt="https://www.rentaporta.com/" />
              <h3>{homeData.testimonialSection.h4}</h3>
              <p>{homeData.testimonialSection.p4}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default Testimonial