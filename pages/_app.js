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
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    ReactGA.initialize('UA-181579330-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  });

  return (
    <>
      <html lang="en" />
      <Head>
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" href="logo-black.svg" />
        <link rel="apple-touch-icon" href="apple-touch-icons/apple-touch-icon-180x180.png" />
        <link rel="maskable_icons" href="maskable_icons/maskable_icon_x512.png" />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta name="theme-color" content="#fff" />
        <meta name = "apple-mobile-web-app-capable" content="yes" />
        <meta name = "apple-mobile-web-app-status-bar-style" content="black" />
        <meta name = "apple-mobile-web-app-title" content="Next PWA demo" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
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
