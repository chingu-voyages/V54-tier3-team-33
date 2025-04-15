import React, { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  setSearchQuery,
  loadProducts,
  setCategory,
  setSubcategory,
} from "../../store/slices/productSlice";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import logo from "../../assets/logo.png";

import { AppDispatch, RootState } from "../../store/store";
import Nav from "../Nav/Nav";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";

interface HeaderProps {
  showAdvertising?: boolean;
  showNav?: boolean;
}

const categoriesMap = [
  {
    name: "Electronics",
    subcategoriesMap: ["Smartphones", "Laptops", "Televisions"],
  },
  { name: "Clothing", subcategoriesMap: ["Jeans", "Sneakers", "Jackets"] },
  { name: "Music", subcategoriesMap: ["Guitars", "Keyboards", "Drums"] },
];

const Header: React.FC<HeaderProps> = ({ showNav = true }) => {
  const dispatch: AppDispatch = useDispatch();

  const { searchQuery, category, subcategory, minPrice, maxPrice } =
    useSelector((state: RootState) => state.products);
  // destructure only setter function
  const [, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    const params: Record<string, string> = {
      page: "1",
      limit: "10",
    };

    if (category) {
      params.category = category;
    }
    if (subcategory) {
      params.subcategory = subcategory;
    }
    if (searchQuery.trim()) {
      params.search = searchQuery;
    }
    if (minPrice) {
      params.minPrice = minPrice.toString();
    }
    if (maxPrice) {
      params.maxPrice = maxPrice.toString();
    }

    setSearchParams(params);
    dispatch(loadProducts({ page: 1, limit: 10 }));
  };

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
    dispatch(setSubcategory(""));
    const params: Record<string, string> = {
      page: "1",
      limit: "10",
      category,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery;
    }

    setSearchParams(params);
  };

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    dispatch(setCategory(category));
    dispatch(setSubcategory(subcategory));
    const params: Record<string, string> = {
      page: "1",
      limit: "10",
      category,
      subcategory,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery;
    }

    setSearchParams(params);
  };

  const handleClearResults = () => {
    dispatch(setSearchQuery(""));
    dispatch(setCategory(""));
    dispatch(setSubcategory(""));
    setSearchParams({});
    console.log("Search query cleared");
  };

  return (
    <div className="text-darktext">
      <div className="flex items-center justify-end px-5 py-2">
        <Link to="/shoppingCart" className="flex items-center gap-2">
          <ShoppingCartIcon className="h-6 w-6" />
        </Link>
      </div>
      <header className="flex flex-wrap items-center justify-between gap-4 p-4 shadow-sm md:flex-nowrap">
        <div className="flex-shrink-0 overflow-visible">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto sm:h-14 md:h-18 lg:h-22"
              onClick={() => {
                dispatch(setCategory(""));
                dispatch(setSubcategory(""));
              }}
            />
          </Link>
        </div>
        <div className="mx-4 flex flex-1 flex-wrap items-center gap-4 md:flex-nowrap">
          <Menu as="div" className="relative">
            <MenuButton className="flex cursor-pointer items-center space-x-2 px-2 py-1 text-sm transition-colors sm:px-4 sm:py-2 sm:text-base">
              <span>Shop by Category</span>
              <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="ring-opacity-5 absolute left-0 z-50 mt-2 max-h-[80vh] w-full origin-top-left overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none md:w-[600px]">
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                  {categoriesMap.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={() => handleCategoryClick(category.name)}
                            className={`${
                              focus ? "bg-customcolortwo" : ""
                            } block rounded-md px-4 py-2 text-sm font-semibold`}
                          >
                            {category.name}
                          </button>
                        )}
                      </MenuItem>
                      <div className="space-y-1">
                        {category.subcategoriesMap.map((subcategory) => (
                          <MenuItem key={subcategory}>
                            {({ focus }) => (
                              <button
                                onClick={() =>
                                  handleSubcategoryClick(
                                    category.name,
                                    subcategory,
                                  )
                                }
                                className={`${
                                  focus ? "bg-customcolortwo" : ""
                                } block rounded-md px-6 py-2 text-sm`}
                              >
                                {subcategory}
                              </button>
                            )}
                          </MenuItem>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          <div className="border-customcolorone ml-4 flex flex-1 items-center overflow-hidden rounded-full border">
            <MagnifyingGlassIcon className="ml-3 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for anything"
              className="sm:placeholder:text-customcolorone min-w-0 flex-1 px-4 py-2 text-sm outline-none placeholder:text-transparent sm:text-base"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            {searchQuery && (
              <button
                className="p-2 transition-colors"
                onClick={handleClearResults}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          className="hidden !w-46 sm:block"
          onClick={handleSearch}
        >
          Search
        </Button>
      </header>

      {showNav && <Nav />}
    </div>
  );
};

export default Header;
