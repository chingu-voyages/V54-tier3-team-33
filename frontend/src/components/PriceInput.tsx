import { useState } from "react";

const PriceInput = () => {
  const [minPrice, setMinPrice] = useState<string>("100");
  const [maxPrice, setMaxPrice] = useState<string>("200");

  const clearMin = () => setMinPrice("");
  const clearMax = () => setMaxPrice("");

  const handleStart = () => {
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-sm text-gray-400">Cena / Moguća zamena</label>
      <div className="flex gap-2">
        {/* Min Input */}
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="rounded-full bg-[#1e1e2f] text-white px-4 py-2 pr-8 border border-blue-500 focus:outline-none"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          {minPrice && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              onClick={clearMin}
              type="button"
            >
              ×
            </button>
          )}
        </div>

        {/* Max Input */}
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="rounded-full bg-[#1e1e2f] text-white px-4 py-2 pr-8 border border-blue-500 focus:outline-none"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          {maxPrice && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              onClick={clearMax}
              type="button"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-2 rounded-full border px-4 py-2 text-black hover:bg-gray-100 hover:text-black"
      >
        Start
      </button>
    </div>
  );
};

export default PriceInput;
