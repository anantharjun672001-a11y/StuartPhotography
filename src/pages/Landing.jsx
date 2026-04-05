import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import ClientSlider from "../components/ClientSlider";
import AboutStudio from "../components/AboutStudio";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Intro/>
      <ClientSlider/>
      <AboutStudio/>

      {/* Next sections later */}
      <div className="h-screen bg-[#0B0F19] text-white flex items-center justify-center">
        Next Sections Coming...
      </div>
    </div>
  );
};

export default Landing;
