import { useState, useRef } from "react";

const PriceSlider = () => {
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(230);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (handle: "min" | "max") => () => {
    setIsDragging(handle);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging || !sliderRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const sliderLeft = sliderRef.current.getBoundingClientRect().left;
    const mouseX = e.clientX - sliderLeft;
    const value = Math.round((mouseX / sliderWidth) * 1000);

    if (isDragging === "min") {
      const newMin = Math.min(value, maxPrice - 1);
      setMinPrice(Math.max(1, newMin));
    } else if (isDragging === "max") {
      const newMax = Math.max(value, minPrice + 1);
      setMaxPrice(Math.min(1000, newMax));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const left = (minPrice / 1000) * 100;
  const right = (maxPrice / 1000) * 100;

  return (
    <div
      className="w-full"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <p className="mb-2 font-medium">Price</p>
      <p className="mb-4">
        {minPrice} EUR – {maxPrice} EUR
      </p>

      <div ref={sliderRef} className="relative h-2 rounded bg-gray-300">
        {/* Active range */}
        <div
          className="absolute h-2 rounded bg-gray-800"
          style={{
            left: `${left}%`,
            width: `${right - left}%`,
          }}
        />

        {/* Left handle */}
        <div
          className="absolute top-1/2 z-10 h-5 w-5 -translate-y-1/2 cursor-pointer rounded-full bg-teal-700"
          style={{ left: `${left}%` }}
          onMouseDown={handleMouseDown("min")}
        />

        {/* Right handle */}
        <div
          className="absolute top-1/2 z-10 h-5 w-5 -translate-y-1/2 cursor-pointer rounded-full bg-teal-700"
          style={{ left: `${right}%` }}
          onMouseDown={handleMouseDown("max")}
        />
      </div>

      <button className="mt-4 rounded-full border px-4 py-2 hover:bg-gray-100">
        Start
      </button>
    </div>
  );
};

export default PriceSlider;
