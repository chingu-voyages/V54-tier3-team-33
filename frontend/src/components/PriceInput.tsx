import { useState, useRef, useEffect } from "react";
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

  const [localMinPrice, setlocalMinPrice] = useState<string>("");
  const [localMaxPrice, setlocalMaxPrice] = useState<string>("");

  const [isOpen, setIsOpen] = useState(false); // ✅ dropdown state
  const dropdownRef = useRef<HTMLDivElement>(null); // ✅ for outside click detection

  const clearMin = () => setlocalMinPrice("");
  const clearMax = () => setlocalMaxPrice("");

  const handlePriceSubmit = () => {
    dispatch(setMinPrice(localMinPrice));
    dispatch(setMaxPrice(localMaxPrice));

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
    setIsOpen(false); // ✅ close dropdown after apply
  };

  // ✅ close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleResetFilters(){
    setlocalMinPrice("");
    setlocalMaxPrice("");
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    setSearchParams({ page: "1", limit: "10" });
  }

  return (
    <div className="relative flex gap-3" ref={dropdownRef}>
      {/* ✅ Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-darktext rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium hover:bg-gray-100"
      >
        Filter by Price Range
      </button>

      <button onClick={handleResetFilters}>Reset all filters</button>

      {/* ✅ Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-10 z-50 mt-2 w-[250px] rounded-xl border bg-white p-4 shadow-lg">
          <div className="text-darktext/70 flex flex-col gap-3">
            <div className="relative">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="bg-customcolortwo w-full rounded-full border px-4 py-1.5 focus:outline-none"
                placeholder="Min Price"
                value={localMinPrice}
                onChange={(e) => setlocalMinPrice(e.target.value)}
              />
              {localMinPrice && (
                <XMarkIcon
                  className="absolute top-1.5 right-1.5 size-7 cursor-pointer rounded-full p-1 hover:bg-gray-200"
                  onClick={clearMin}
                  type="button"
                />
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="bg-customcolortwo w-full rounded-full border px-4 py-1.5 focus:outline-none"
                placeholder="Max Price"
                value={localMaxPrice}
                onChange={(e) => setlocalMaxPrice(e.target.value)}
              />
              {localMaxPrice && (
                <XMarkIcon
                  className="absolute top-1.5 right-1.5 size-7 cursor-pointer rounded-full p-1 hover:bg-gray-200"
                  onClick={clearMax}
                  type="button"
                />
              )}
            </div>

            {/* ✅ Apply Button */}
            <button
              onClick={handlePriceSubmit}
              className="bg-primary hover:bg-primaryHover w-full cursor-pointer rounded-full px-4 py-2 text-sm text-white transition-all focus:outline-none"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceInput;
