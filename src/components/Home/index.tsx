import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Services from "./Services";
import { home_data } from "../../constants";

const Home = () => {
  const { hero, features, services, locations } = home_data;
  return (
    <div>
      <Hero {...hero} />
      <Features {...features} />
      <Services {...services} />
    </div>
  );
};

export default Home;
