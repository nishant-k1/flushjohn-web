import '../styles/globals.css'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import {SidebarContextProvider} from '../components/SidebarContext'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <SidebarContextProvider>
        <Nav />
        <Sidebar />
        <Component {...pageProps} />
        <Footer />
      </SidebarContextProvider>
    </Layout>
  )
}

export default MyApp
