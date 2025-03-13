import React, { useState, useEffect, useCallback } from "react";
import { Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@heroicons/react/20/solid";
import comicBooks from '../../assets/advertising/comicBooks.jpg';
import toys from '../../assets/advertising/toys.jpg';
import baseballCards from '../../assets/advertising/baseballCards.jpg';

const AdvertisingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Vintage Baseball Cards",
      description: "Discover rare and collectible baseball cards!",
      image: baseballCards,
    },
    {
      id: 2,
      title: "Toys",
      description: "Explore the latest and greatest toys for all ages!",
      image: toys,
    },
    {
      id: 3,
      title: "Comic Books",
      description: "Dive into the world of superheroes and graphic novels!",
      image: comicBooks,
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
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg py-8"> 
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
      <div className="absolute inset-0 flex items-center bg-[#36486b] justify-between px-8"> 
        <div className="w-1/2 flex flex-col justify-center text-white z-10 ml-50">
          <h2 className="text-4xl font-bold">{slide.title}</h2>
          <p className="text-xl mt-4">{slide.description}</p>
        </div>

        <div className="w-1/2 flex items-center justify-end mr-50">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-3/4 h-auto object-contain rounded-lg" 
            onError={(e) => {
              console.error("Image failed to load:", slide.image);
              e.currentTarget.src = "https://via.placeholder.com/800x400?text=Image+Not+Found"; 
            }}
          />
        </div>
      </div>
    </Transition>
  ))}

  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
  >
    <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
  >
    <ChevronRightIcon className="h-6 w-6 text-gray-800" />
  </button>

  <button
    onClick={togglePause}
    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-colors"
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