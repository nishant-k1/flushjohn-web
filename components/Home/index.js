import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Services from "./Services";
import Locations from "./Locations";
import { home_data } from "../../constants";
import { Breadcrumb } from "antd";

const Home = () => {
  const { hero, features, services, locations } = home_data;
  return (
    <div>
      <Hero {...hero} />
      <Features {...features} />
      <Services {...services} />
      <Locations {...locations} />
    </div>
  );
};

export default Home;
