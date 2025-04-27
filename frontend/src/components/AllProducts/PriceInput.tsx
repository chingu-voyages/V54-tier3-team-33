import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMaxPrice, setMinPrice } from "../../store/slices/productSlice";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../store/store";

import { FunnelIcon } from "@heroicons/react/24/outline";
import Button from "../../utils/Button";

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

  function handleResetFilters() {
    setlocalMinPrice("");
    setlocalMaxPrice("");
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    setSearchParams({ page: "1", limit: "10" });
  }

  return (
    <div
      className="text-darktext relative flex w-full flex-col gap-3 sm:w-fit sm:flex-row"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border-darktext/50 flex cursor-pointer items-center gap-2 rounded-full border-2 px-3 py-[6.5px] font-medium hover:bg-gray-100"
      >
        <FunnelIcon className="size-5" />
        Filter by Price Range
      </button>

      <Button
        onClick={handleResetFilters}
        variant="primary"
        className="!border-primary w-full !border-4 text-sm sm:w-30"
      >
        Reset filter
      </Button>

      {/* ✅ Dropdown Panel */}
      {isOpen && (
        <div className="border-darktext/40 absolute top-10 z-50 mt-2 w-[250px] rounded-xl border bg-white p-4 shadow-lg">
          <div className="flex flex-col gap-3">
            <div className="relative flex flex-col items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="bg-customcolortwo border-darktext/60 w-full rounded-full border px-4 py-1.5 focus:outline-none"
                placeholder="Min Price"
                value={localMinPrice}
                onChange={(e) => setlocalMinPrice(e.target.value)}
              />

              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className="bg-customcolortwo border-darktext/60 w-full rounded-full border px-4 py-1.5 focus:outline-none"
                placeholder="Max Price"
                value={localMaxPrice}
                onChange={(e) => setlocalMaxPrice(e.target.value)}
              />
            </div>

            {/* ✅ Apply Button */}
            <Button
              onClick={handlePriceSubmit}
              variant="primary"
              className="w-full text-sm"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceInput;
