import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import '../styles/globals.css'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import {SidebarContextProvider} from '../contexts/SidebarContext'
import { QuoteContextProvider } from '../contexts/QuoteContext'
import Testimonial from '../components/Testimonial'
import ReactGA from 'react-ga';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    ReactGA.initialize('UA-181579330-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <>
      <DefaultSeo {...SEO}/>
      <SidebarContextProvider>
        <QuoteContextProvider>
          <Sidebar />
          <Layout>
            <Nav />
            <Component {...pageProps} />
            <Testimonial />
            <Footer />
          </Layout>
        </QuoteContextProvider>
      </SidebarContextProvider>
    </>
  )
}

export default MyApp
