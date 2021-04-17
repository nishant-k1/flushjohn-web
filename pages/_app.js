import '../styles/globals.css'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import {SidebarContextProvider} from '../components/SidebarContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <SidebarContextProvider>
      <Sidebar />
      <Layout>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </SidebarContextProvider>
    </>
  )
}

export default MyApp
