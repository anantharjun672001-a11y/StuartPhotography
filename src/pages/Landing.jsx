import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import ClientSlider from "../components/ClientSlider";
import AboutStudio from "../components/AboutStudio";
import Owner from "../components/Owner";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Intro/>
      <ClientSlider/>
      <AboutStudio/>
      <Owner/>
      <Footer/>
    </div>
  );
};

export default Landing;
