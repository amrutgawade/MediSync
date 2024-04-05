import React from "react";
import hospital1 from "../../assets/hospitals/hospital1.jpg";
import hospital2 from "../../assets/hospitals/hospital2.jpg";
import hospital3 from "../../assets/hospitals/hospital3.jpg";
import hospital4 from "../../assets/hospitals/hospital4.jpg";
import hospital5 from "../../assets/hospitals/hospital5.jpg";
import hospital6 from "../../assets/hospitals/hospital6.jpg";
import hospital7 from "../../assets/hospitals/hospital7.jpg";
import HospitalCard from "../Cards/HospitalCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HospitalCardCarousel() {
  const hospitals = [
    {
      imageUrl: hospital1,
      brand: "Lilavati Hospital",
    },

    {
      imageUrl: hospital2,
      brand: "Apollo Hospital",
    },

    {
      imageUrl: hospital3,
      brand: "Nanavati Hospital",
    },

    {
      imageUrl: hospital4,
      brand: "Aditya Birla Hospital",
    },
    {
      imageUrl: hospital5,
      brand: "Kokila Hospital",
    },
    {
      imageUrl: hospital6,
      brand: "D.Y.Patil Hospital",
    },
    {
      imageUrl: hospital7,
      brand: "Apple Hospital",
    },
  ];

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={`slick-arrow slick-next flex justify-center items-center px-5 rounded h-20 bg-black/50 hover:bg-black/50`}
        onClick={onClick}
      />
    );
  }
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={`slick-arrow slick-prev z-10 flex justify-center items-center px-5 rounded h-20 bg-black/50 hover:bg-black/50`}
        onClick={onClick}
      />
    );
  }

  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          infinite: true,
          speed: 500,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="relative px-4 lg:px-8">
      <h2 className="text-3xl mb-2 font-extrabold text-center text-gray-800">
        Popular Hospitals
      </h2>
      <div className="w-16 h-[5px] bg-green-500 mx-auto mb-8"></div>
      <Slider {...settings}>
        {hospitals.map((item) => (
          <HospitalCard product={item} key={item} />
        ))}
      </Slider>
      {/* <h1 className="sm:hidden text-center mt-2 font-semibold">Swipe</h1> */}
    </div>
  );
}

export default HospitalCardCarousel;
