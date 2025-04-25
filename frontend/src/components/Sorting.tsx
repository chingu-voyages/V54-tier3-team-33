import {useLocation } from "react-router-dom";
import React , {useEffect , useState} from "react";
import {FaSortAmountDown} from "react-icons/fa";
import {useSearchParamUpdater} from "../hooks/useSearchParamsUpdater.ts";

export type SortKey = 'price_asc' | 'price_desc' | 'popular';

const sortKeys: Record<SortKey , string> = {
    'price_asc': "price_asc",
    'price_desc': "price_desc",
    'popular': "popular"
};

const sortLabels: Record<SortKey , string> = {
    'price_asc': 'Price: Low to High',
    'price_desc': 'Price: High to Low',
    'popular': 'Most Popular'
};

export const SortDropdown = () => {
    const location = useLocation();

    const {updateSearchParam} = useSearchParamUpdater();
    const queryParams = new URLSearchParams(location.search);
    const initialSort = queryParams.get('sort') || "popular";

    const [sortKey, setSortKey] = useState(initialSort);

    const handleChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        const selectedKey = e.target.value;
        setSortKey(selectedKey);
        updateSearchParam('/','sort', selectedKey);
    };

    useEffect(() => {
        const urlSort = new URLSearchParams(location.search).get('sort');
        if (urlSort && urlSort !== sortKey) {
            setSortKey(urlSort);
        }
    }, [location.search]);

    useEffect(() => {
        updateSearchParam("/","sort", initialSort)
    } , []);

    return (
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2   transition duration-200">
            <FaSortAmountDown className="text-gray-600" />
            <select
                value={sortKey}
                onChange={handleChange}
                className="outline-none bg-transparent text-gray-700 font-medium cursor-pointer"

            >
                <option value="" disabled>
                    Sort by..
                </option>
                {(Object.keys(sortKeys) as SortKey[]).map((key) => (
                    <option
                        key={key}
                        value={key}
                        defaultValue=""
                        className="text-sm bg-white p-2 text-gray-700 font-medium"
                    >
                        {sortLabels[key]}
                    </option>
                ))}
            </select>
        </div>
    );
};


