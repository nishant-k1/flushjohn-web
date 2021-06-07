import {AiFillFacebook, AiFillTwitterSquare, AiFillInstagram, AiFillLinkedin} from 'react-icons/ai'
import {FaPinterestSquare} from 'react-icons/fa'
import headerStyles from '../styles/Header.module.css'
import Link from 'next/link'

const Header = () => {
  return (
    <div className={headerStyles.section}>
      <div className={headerStyles.container}>
        <Link href='/'><img src="brand-logo-transparent.svg" alt="brand-logo" /></Link>
        <ul className={headerStyles.nav}>
          <li>
            <Link href='https://www.facebook.com/portarental'>
                <AiFillFacebook className={`${headerStyles.icon } ${headerStyles.fb}`} />
            </Link>
          </li>
          <li>
            <Link href='https://twitter.com/rentaporta'>
                <AiFillTwitterSquare className={`${headerStyles.icon } ${headerStyles.twitter}`} />
            </Link>
          </li>
          <li>
            <Link href='https://www.instagram.com/rent_a_porta/'>
              <AiFillInstagram className={`${headerStyles.icon } ${headerStyles.instagram}`} />
            </Link>
          </li>
          <li>
            <Link href='linkedin.com/company/rent-a-porta'>
                <AiFillLinkedin className={`${headerStyles.icon } ${headerStyles.linkedin}`} />
            </Link>
          </li>
          <li>
            <Link href='https://www.pinterest.com/renta_porta'>
                <FaPinterestSquare className={`${headerStyles.icon } ${headerStyles.pinterest}`} />
            </Link>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default Header
