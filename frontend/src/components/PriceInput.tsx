import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMaxPrice, setMinPrice } from "../store/slices/productSlice";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../store/store";
import { XMarkIcon } from "@heroicons/react/24/solid";

const PriceInput = () => {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const { searchQuery, category, subcategory } = useSelector(
    (state: RootState) => state.products,
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

    // build updated search parameters
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
    <div className="flex items-center gap-3">
      <p className="text-lg">Filter by Price:</p>
      <div className="text-darktext/70 flex gap-2">
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="bg-customcolortwo w-40 rounded-full border px-4 py-1 focus:outline-none"
            placeholder="Min Price"
            value={localMinPrice}
            onChange={(e) => setlocalMinPrice(e.target.value)}
          />
          {localMinPrice && (
            <XMarkIcon
              className="absolute top-0.5 right-0.5 size-8 cursor-pointer rounded-full p-1.5 transition-all"
              onClick={clearMin}
              type="button"
            />
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="bg-customcolortwo w-40 rounded-full border px-4 py-1 focus:outline-none"
            placeholder="Max Price"
            value={localMaxPrice}
            onChange={(e) => setlocalMaxPrice(e.target.value)}
          />
          {localMaxPrice && (
            <XMarkIcon
              className="absolute top-0.5 right-0.5 size-8 cursor-pointer rounded-full p-1.5 transition-all"
              onClick={clearMax}
              type="button"
            />
          )}
        </div>
      </div>

      <button
        onClick={handlePriceSubmit}
        className="bg-primary hover:bg-primaryHover w-fit cursor-pointer rounded-full px-4 py-2 text-sm text-white transition-all focus:outline-none"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceInput;
