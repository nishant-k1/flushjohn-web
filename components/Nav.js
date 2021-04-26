import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaPhoneAlt} from 'react-icons/fa'
import {SidebarContext} from '../contexts/SidebarContext'
import {useContext} from 'react'

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
            <li className={navStyles.quote}><Link type="button" href="/quote"><h3>GET A QUOTE</h3></Link></li>
            <li className={navStyles.phone}><Link type="button" href='tel:(855) 780-3061'><div><FaPhoneAlt />(855) 780-3061</div></Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav
