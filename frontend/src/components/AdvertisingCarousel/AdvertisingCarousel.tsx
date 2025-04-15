import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

import sneakers from "../../assets/advertising/sneakers.jpg";
import electronicDevices from "../../assets/advertising/electronicDevices.jpg";
import vintageGuitars from "../../assets/advertising/vintageGuitars.jpg";

const AdvertisingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Music for Everyone",
      description:
        "Explore the latest and greatest keyboards, drums and guitars",
      image: vintageGuitars,
    },
    {
      id: 2,
      title: "Electronic Devices",
      description: "Discover the latest smartphones, laptops and televisions",
      image: electronicDevices,
    },
    {
      id: 3,
      title: "Fashionable Clothing",
      description: "Classic jeans, cool sneakers and jackets for all ages!",
      image: sneakers,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      aria-live="polite"
      className="relative h-94 w-full overflow-hidden rounded-lg border-2 border-amber-800 mx-4 py-4 md:py-8"
    >
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
          aria-hidden={index !== currentSlide}
        >
          <section className="absolute inset-0 flex flex-col items-center justify-between bg-[#36486b] px-4 md:flex-row md:px-8">
            <article className="z-10 mb-4 flex w-full flex-col justify-center text-center text-white md:mb-0 md:w-1/2 md:text-left">
              <h2 className="mt-10 text-2xl font-bold md:mt-0 md:ml-10 md:text-4xl">
                {slide.title}
              </h2>
              <p className="mt-2 text-lg md:mt-4 md:ml-10 md:text-xl">
                {slide.description}
              </p>
            </article>

            <article className="relative flex h-48 w-full items-center justify-center md:h-64 md:w-1/2 md:justify-end">
              <img
                src={slide.image}
                alt={slide.title}
                className="mb-10 h-48 w-full rounded-lg border-2 border-white object-cover shadow-lg md:mb-0 md:h-64 md:w-3/4"
                loading="lazy"
                onError={(e) => {
                  console.error("Image failed to load:", slide.image);
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x400?text=Image+Not+Found";
                }}
              />
            </article>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`size-3 cursor-pointer rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-gray-400"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))}
            </div>
          </section>
        </Transition>
      ))}
    </div>
  );
};

export default AdvertisingCarousel;
