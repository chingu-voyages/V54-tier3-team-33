import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid"; 
import logo from "../../assets/logo.png";
import { searchProducts, loadProducts } from "../../store/slices/productSlice"; 
import { AppDispatch } from "../../store/store"; 
import Nav from "../Nav/Nav";

interface HeaderProps {
  showAdvertising?: boolean; 
}

const Header: React.FC<HeaderProps> = () => {
  const categories = ["Electronics", "Clothing", "Music", "Home Appliances", "Toys", "Sporting Goods", "Jewelry & Watches"];
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch: AppDispatch = useDispatch(); 

  useEffect(() => {
    dispatch(loadProducts()); 
  }, [dispatch]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      return; 
    }
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
      <header className="bg-white shadow-sm pt-4 pr-10 pb-4 pl-10 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-30" />
        </div>

        <div className="flex items-center flex-1 mx-4">
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-2 bg-white px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-gray-700">Shop by Category</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
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
              <MenuItems className="absolute left-0 mt-2 w-48 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  {categories.map((category) => (
                    <MenuItem key={category}>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`${
                            focus ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          {category}
                        </a>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          <div className="flex items-center bg-white border border-gray-700 rounded-md overflow-hidden flex-1 ml-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-3" />
            <input
              type="text"
              placeholder="Search for anything"
              className="px-4 py-2 outline-none flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            {searchQuery && (
              <button
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleClearResults}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
            <select
              className="bg-transparent text-gray-500 border-l border-gray-200 pl-1 pr-6 py-2 focus:outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange} 
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Clothing">Music</option>
              <option value="Clothing">Home Appliances</option>
              <option value="Clothing">Toys</option>
              <option value="Clothing">Sporting Goods</option>
              <option value="Clothing">Jewelry & Watches</option>
            </select>
          </div>
        </div>

        <button
          className="bg-[#3b82f6] text-white px-6 py-3 rounded-md hover:bg-[#2563eb] transition-colors cursor-pointer"
          onClick={handleSearch} 
        >
          Search
        </button>
      </header>
      <div className="mt-2 pt-1 pr-10 pl-10">
        <Nav />
      </div>
    </>
  );
};

export default Header;