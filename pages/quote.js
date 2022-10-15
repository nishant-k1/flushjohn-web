import QuoteStep1 from "../components/QuoteStep1";
import QuoteStep2 from "../components/QuoteStep2";
import QuoteStep3 from "../components/QuoteStep3";
import QuoteStep4 from "../components/QuoteStep4";
import quoteProgressStyles from "../styles/QuoteProgress.module.css";
import { useContext } from "react";
import { QuoteContext } from "../contexts/QuoteContext";
import { NextSeo } from "next-seo";
import Head from "next/head";

const SEO = {
  title: "Reliable Portable - Quote | Get Instant Quote & Bookings",
  description:
    "Reliable Portable potty from a leading porta john rental service provider in united states, california, ohio, michigan, alabama",
};

const quote = () => {
  const { render } = useContext(QuoteContext);
  const [step] = render;
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="-7RA9p2zau4hrs82YsLlEwn89woYgVoNsZ6Nxj92qHw"
        />
        <meta
          name="keywords"
          content={`porta potty rental in california, porta potty rental near me, porta john rental in New Jersey, portable restroom rental in Indiana, rent a toilet in Michigan`}
        />
      </Head>
      <NextSeo {...SEO} />
      <div className={quoteProgressStyles.section}>
        <div className={quoteProgressStyles.container}>
          <div className={quoteProgressStyles.progressBar}>
            <div
              className={`${quoteProgressStyles.step} ${
                step === 1 || step === 2 || step === 3 || step === 4
                  ? `${quoteProgressStyles.active}`
                  : null
              }`}
            >
              <b>Step1</b>Requirement Information
            </div>
            <div
              className={`${quoteProgressStyles.step} ${
                step === 2 || step === 3 || step === 4
                  ? `${quoteProgressStyles.active}`
                  : null
              }`}
            >
              <b>Step2</b>Personal Information
            </div>
            <div
              className={`${quoteProgressStyles.step} ${
                step === 3 || step === 4
                  ? `${quoteProgressStyles.active}`
                  : null
              }`}
            >
              <b>Step3</b>Delivery Information
            </div>
          </div>
          <div className={quoteProgressStyles.innerSection}>
            {step === 1 ? <QuoteStep1 /> : null}
            {step === 2 ? <QuoteStep2 /> : null}
            {step === 3 ? <QuoteStep3 /> : null}
            {step === 4 ? <QuoteStep4 /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default quote;
