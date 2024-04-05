import React from "react";
import MainCarousel from "./Carousels/MainCarousel";
import HospitalCardCarousel from "./Carousels/HospitalCardCarousel";

function Home() {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-20">
        <HospitalCardCarousel />
      </div>
    </div>
  );
}

export default Home;
