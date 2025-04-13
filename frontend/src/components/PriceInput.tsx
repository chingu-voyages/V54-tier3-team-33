import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMaxPrice, setMinPrice } from "../store/slices/productSlice";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../store/store";

const PriceInput = () => {

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, category, subcategory } = useSelector(
    (state: RootState) => state.products
  );

  const [localMinPrice, setlocalMinPrice] = useState<string>("100");
  const [localMaxPrice, setlocalMaxPrice] = useState<string>("200");

  const clearMin = () => setlocalMinPrice("");
  const clearMax = () => setlocalMaxPrice("");

  const handlePriceSubmit = () => {
    console.log("Min Price:", localMinPrice);
    console.log("Max Price:", localMaxPrice);

    dispatch(setMinPrice(localMinPrice));
    dispatch(setMaxPrice(localMaxPrice));

    // Build updated search parameters
    const params: Record<string, string> = {
      page: "1",
      limit: "10",
    };

    if (searchQuery) params.search = searchQuery;
    if (category) params.category = category;
    if (subcategory) params.subcategory = subcategory;
    if (localMinPrice) params.minPrice = localMinPrice;
    if (localMaxPrice) params.maxPrice = localMaxPrice;

    setSearchParams(params);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-sm text-gray-400">Price</label>
      <div className="flex gap-2">
        {/* Min Input */}
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="rounded-full border border-blue-500 bg-[#1e1e2f] px-4 py-2 pr-8 text-white focus:outline-none"
            placeholder="Min"
            value={localMinPrice}
            onChange={(e) => setlocalMinPrice(e.target.value)}
          />
          {localMinPrice && (
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-300 hover:text-white"
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
            className="rounded-full border border-blue-500 bg-[#1e1e2f] px-4 py-2 pr-8 text-white focus:outline-none"
            placeholder="Max"
            value={localMaxPrice}
            onChange={(e) => setlocalMaxPrice(e.target.value)}
          />
          {localMaxPrice && (
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-300 hover:text-white"
              onClick={clearMax}
              type="button"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <button
        onClick={handlePriceSubmit}
        className="mt-2 rounded-full border px-4 py-2 text-black hover:bg-gray-100 hover:text-black"
      >
        Start
      </button>
    </div>
  );
};

export default PriceInput;
