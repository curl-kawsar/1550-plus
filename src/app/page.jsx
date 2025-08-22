import React from "react";
import MidPoint from "@/components/landing-page/Mid-point";
import Testimonial from "@/components/landing-page/Testimonial";
import CallToAction from "@/components/landing-page/CallToAction";
import HowItWorks from "@/components/landing-page/HowItWorks";
import ProveYourself from "@/components/landing-page/ProveYourself";


const Home = () => {
  return (
    <div>
      <ProveYourself />
      <HowItWorks />
      <MidPoint />
      <Testimonial />
      <CallToAction />

    </div>
  )
}

export default Home;