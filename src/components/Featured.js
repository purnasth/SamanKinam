import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Featured = () => {
  const [sliders, setSliders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setSliders(data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSliders();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return sliders.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex < sliders.length - 1) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  };

  return (
    <div
      className="max-w-[1520px] h-[600px] w-full py-4 px-4 relative m-auto group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        style={{ backgroundImage: `url(${sliders[currentIndex]?.image})` }}
      ></div>
      <div
        className={`absolute flex items-center space-x-2 bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 delay-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {sliders.map((slide, index) => (
          <div
            key={index}
            className={`mb-2 h-3 w-3 rounded-full transition-all cursor-pointer ${
              index === currentIndex ? "bg-orange-700 w-10" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
      <div
        className={`hidden ${
          isHovered ? "block" : ""
        } group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer`}
        onClick={prevSlide}
      >
        <BsChevronCompactLeft />
      </div>
      <div
        className={`hidden ${
          isHovered ? "block" : ""
        } group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-orange-700 text-white cursor-pointer`}
        onClick={nextSlide}
      >
        <BsChevronCompactRight />
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
        <h3
          className="text-lg font-semibold text-white"
          style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}
        >
          {sliders[currentIndex]?.title}
        </h3>
      </div>
    </div>
  );
};

export default Featured;
