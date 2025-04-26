import React from "react";
import Slider from "./components/slider"
import OnGoingProjects from "./components/onGoingProjects";
import OurServices from "./components/ourServices";
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
        <OurServices />
        <OurProjects />
        <Companys />
      </div>
    </div>
  );
}
