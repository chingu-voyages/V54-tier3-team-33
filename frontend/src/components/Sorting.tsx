import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { useSearchParamUpdater } from "../hooks/useSearchParamsUpdater.ts";

export type SortKey = "price_asc" | "price_desc" | "popular";

const sortKeys: Record<SortKey, string> = {
  price_asc: "price_asc",
  price_desc: "price_desc",
  popular: "popular",
};

const sortLabels: Record<SortKey, string> = {
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  popular: "Most Popular",
};

export const SortDropdown = () => {
  const location = useLocation();
  const { updateSearchParam } = useSearchParamUpdater();

  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "";

  const [sortKey, setSortKey] = useState(initialSort);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = e.target.value;
    setSortKey(selectedKey);
    if (selectedKey) updateSearchParam("/", "sort", selectedKey);
  };

  useEffect(() => {
    const urlSort = new URLSearchParams(location.search).get("sort");
    if (urlSort && urlSort !== sortKey) {
      setSortKey(urlSort);
    }
  }, [location.search]);

  return (
    <div className="text-darktext flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 transition duration-200">
      <ArrowsUpDownIcon className="size-5" />
      <select
        value={sortKey}
        onChange={handleChange}
        className="cursor-pointer bg-transparent font-medium outline-none"
      >
        <option value="" disabled>
          Sort by
        </option>
        {(Object.keys(sortKeys) as SortKey[]).map((key) => (
          <option
            key={key}
            value={key}
            className="bg-white p-2 text-sm font-medium"
          >
            {sortLabels[key]}
          </option>
        ))}
      </select>
    </div>
  );
};
