import dynamic from "next/dynamic";
import { home_data } from "../constants";
import React from "react";
const Hero = dynamic(() => import("./Hero"));
const CombinedContactBar = dynamic(
  () => import("@/components/CombinedContactBar")
);
const Features = dynamic(() => import("./Features"));
const Services = dynamic(() => import("./Services"));
const TrustSignals = dynamic(() => import("./TrustSignals"));
const ServiceAreas = dynamic(() => import("./ServiceAreas"));
const CTAsection = dynamic(() => import("./CTAsection"));

const Home = () => {
  const { hero, features, services } = home_data;

  return (
    <>
      <React.Suspense fallback={<div>...</div>}>
        <Hero {...hero} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <CombinedContactBar />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <TrustSignals />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <Services {...services} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <Features {...features} />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <ServiceAreas />
      </React.Suspense>
      <React.Suspense fallback={<div>...</div>}>
        <CTAsection />
      </React.Suspense>
    </>
  );
};

export default Home;
