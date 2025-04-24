import React from "react";
import Slider from "./components/slider"
import OnGoingProjects from "./components/onGoingProjects";
import AboutUs from "./components/aboutUs";
import OurProjects from "./components/ourProjects";
import Companys from "./components/companys";

export const dynamic = 'force-dynamic';
export const revalidate = 5;
export default function Home() {


  return (
    <div>
      <div>
        <Slider />
        <OnGoingProjects />
        <AboutUs />
        <OurProjects />
        <Companys />
      </div>
    </div>
  );
}
