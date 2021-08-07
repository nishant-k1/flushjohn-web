import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaPhoneAlt} from 'react-icons/fa'
import {SidebarContext} from '../contexts/SidebarContext'
import {useContext} from 'react'
import {Event} from '../lib/analytics'


const Nav = () => {
  const [active, setActive] = useContext(SidebarContext);

  return (
    <div className={navStyles.section}>
      <div className={navStyles.container}>
        <div className={navStyles.nav}>
          <GiHamburgerMenu className={navStyles.menuIcon} onClick={()=>setActive(!active)}/>
          <Link href='/'><img src="brand-logo-transparent.svg" alt="brand-logo" /></Link>
          <ul className={navStyles.navMenu}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products & Services</Link></li>
            <li className={navStyles.quote}><Link type="button" href="/quote">GET A QUOTE</Link></li>
            <li className={navStyles.phone}>
              <a href='tel: +1 (855) 780-3061' type="button" onClick={ (e) => { Event("Request quote", "Desktop Phone Call", "DPC")}}>
                <div>
                  <FaPhoneAlt />
                  (855) 780-3061
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav
