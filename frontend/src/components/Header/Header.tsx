import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import logo from "../../assets/logo.png";
import { searchProducts } from "../../store/slices/localProductSlice";
//import { searchProducts } from "../../store/slices/productSlice";
import { AppDispatch } from "../../store/store";
import Nav from "../Nav/Nav";

interface HeaderProps {
  showAdvertising?: boolean;
  showNav?: boolean; 
}

const Header: React.FC<HeaderProps> = ({ showNav = true }) => { 
  const categories = [
    { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Televisions"] },
    { name: "Clothing", subcategories: ["Jeans", "Sneakers", "Jackets"] },
    { name: "Music", subcategories: ["Guitars", "Keyboards", "Drums"] },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    dispatch(searchProducts({ query: searchQuery, category: selectedCategory }));
  };

  const handleClearResults = () => {
    setSearchQuery("");
    setSelectedCategory("");
    dispatch(searchProducts({ query: "", category: "" }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    dispatch(searchProducts({ query: searchQuery, category }));
  };

  return (
    <>
      <div className="flex items-center justify-end px-5 py-2">
        <Link to="/shoppingCart" className="flex items-center gap-2">
          <ShoppingCartIcon className="h-6 w-6 text-gray-500" />
        </Link>
      </div>
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 shadow-sm md:flex-nowrap">
        <div className="flex-shrink-0 overflow-visible">
          <img src={logo} alt="Logo" className="h-10 w-auto sm:h-14 md:h-18 lg:h-22" />
        </div>
        <div className="mx-4 flex flex-1 flex-wrap items-center gap-4 md:flex-nowrap">
          <Menu as="div" className="relative">
            <MenuButton className="flex cursor-pointer items-center space-x-2 bg-white px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-base">
              <span>Shop by Category</span>
              <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
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
              <MenuItems className="ring-opacity-5 absolute left-0 z-50 mt-2 w-full md:w-[600px] origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none overflow-y-auto max-h-[80vh]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            to={`/category/${category.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                            className={`${
                              focus ? "bg-gray-100" : ""
                            } block rounded-md px-4 py-2 text-sm font-semibold text-gray-700`}
                          >
                            {category.name}
                          </Link>
                        )}
                      </MenuItem>
                      <div className="space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <MenuItem key={subcategory}>
                            {({ focus }) => (
                              <Link
                                to={`/category/${category.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                                className={`${
                                  focus ? "bg-gray-100" : ""
                                } block rounded-md px-6 py-2 text-sm text-gray-500`}
                              >
                                {subcategory}
                              </Link>
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

          <div className="ml-4 flex flex-1 items-center overflow-hidden rounded-md border border-gray-700 bg-white">
            <MagnifyingGlassIcon className="ml-3 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for anything"
              className="flex-1 min-w-0 px-4 py-2 text-sm outline-none sm:text-base placeholder:text-transparent sm:placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); 
                }
              }}
            />
            {searchQuery && (
              <button
                className="p-2 text-gray-500 transition-colors hover:text-gray-700"
                onClick={handleClearResults}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
            <select
              className="hidden border-l border-gray-200 bg-transparent py-2 pr-6 pl-1 text-gray-500 focus:outline-none sm:block"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Music">Music</option>
            </select>

            <button
              className="flex items-center justify-center rounded-r-md bg-[#3b82f6] p-2 text-white sm:hidden"
              onClick={handleSearch}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button
          className="hidden flex-shrink cursor-pointer rounded-md bg-[#3b82f6] px-4 py-2 text-sm text-white transition-colors hover:bg-[#2563eb] sm:block md:px-6 md:py-3 md:text-base"
          onClick={handleSearch}
        >
          Search
        </button>
      </header>
      
      {showNav && (  
      <div className="mt-2 pt-1 pr-10 pl-10">
        <Nav />
      </div>
    )}
    </>
  );
};

export default Header;