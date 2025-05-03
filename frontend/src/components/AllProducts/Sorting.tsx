import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { useSearchParamUpdater } from "../../hooks/useSearchParamsUpdater.ts";

export type SortKey = "price_asc" | "price_desc" | "popular" | "default";

const sortKeys: Record<SortKey, string> = {
  default: "",
  price_asc: "price_asc",
  price_desc: "price_desc",
  popular: "popular",
};

const sortLabels: Record<SortKey, string> = {
  default: "Sort by: Default",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  popular: "Most Sold",
};

export const SortDropdown = () => {
  const location = useLocation();
  const { updateSearchParam } = useSearchParamUpdater();

  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "default";

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
    <div className="text-darktext border-darktext/50 flex w-full items-center gap-2 rounded-full border-2 bg-white px-3 transition duration-200 hover:bg-gray-100 sm:w-fit">
      <ArrowsUpDownIcon className="size-5" />
      <select
        value={sortKey}
        onChange={handleChange}
        className="grow cursor-pointer py-2 font-medium outline-none"
      >
        {(Object.keys(sortKeys) as SortKey[]).map((key) => (
          <option
            key={key}
            value={key}
            className="cursor-pointer bg-white p-2 py-10"
          >
            {sortLabels[key]}
          </option>
        ))}
      </select>
    </div>
  );
};
