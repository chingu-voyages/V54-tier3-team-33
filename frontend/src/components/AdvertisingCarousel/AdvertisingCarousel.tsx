import React, { useState, useEffect, useCallback } from "react";
import { Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import sneakers from '../../assets/advertising/sneakers.jpg';
import electronicDevices from '../../assets/advertising/electronicDevices.jpg';
import vintageGuitars from '../../assets/advertising/vintageGuitars.jpg';

const AdvertisingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Vintage Electric Guitars",
      description: "Discover rare and collectible electric guitars!",
      image: vintageGuitars,
    },
    {
      id: 2,
      title: "Electronic Devices",
      description: "Explore the latest and greatest electronic devices for all ages!",
      image: electronicDevices,
    },
    {
      id: 3,
      title: "Sneakers",
      description: "Classic and cools sneakers for all ages!",
      image: sneakers,
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg py-4 md:py-8">
      {slides.map((slide, index) => (
        <Transition
          key={slide.id}
          show={index === currentSlide}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 flex flex-col md:flex-row items-center bg-[#36486b] justify-between px-4 md:px-8">
            <div className="w-full md:w-1/2 flex flex-col justify-center text-white z-10 text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-2xl md:text-4xl font-bold md:ml-10">{slide.title}</h2>
              <p className="text-lg md:text-xl mt-2 md:mt-4 md:ml-10">{slide.description}</p>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end h-48 md:h-64 relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full md:w-3/4 h-48 md:h-64 object-cover rounded-lg shadow-lg border-2 border-white"
                onError={(e) => {
                  console.error("Image failed to load:", slide.image);
                  e.currentTarget.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#36486b]/50 to-[#36486b]/0 rounded-lg"></div> {/* Gradient overlay */}
            </div>
          </div>
        </Transition>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={togglePause}
        className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
      >
        {isPaused ? (
          <PlayIcon className="h-6 w-6 text-gray-800" />
        ) : (
          <PauseIcon className="h-6 w-6 text-gray-800" />
        )}
      </button>
    </div>
  );
};

export default AdvertisingCarousel;