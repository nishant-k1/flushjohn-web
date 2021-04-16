import sidebarStyles from '../styles/Sidebar.module.css'
import Link from 'next/link'
import {FaPhoneAlt} from 'react-icons/fa'
import {SidebarContext} from '../components/SidebarContext'
import {useContext} from 'react'

const Sidebar = () => {
  const [active, setActive] = useContext(SidebarContext);
  return (
    <div className=
      { 
        `${sidebarStyles.section} ${active ? sidebarStyles.active : sidebarStyles.inactive}`
      }
      
    >
      <div className={sidebarStyles.container}>
        <div className={sidebarStyles.sidebar}>
          <Link href='/'><img src="brand-logo-transparent.svg" alt="brand-logo" /></Link>
          <ul className={sidebarStyles.sidebarMenu}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products & Services</Link></li>
            <li className={sidebarStyles.quote}><Link href="/quote">GET A QUOTE</Link></li>
            <li className={sidebarStyles.phone}><Link href='tel:(855) 780-3061'><div><FaPhoneAlt />(855) 780-3061</div></Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
