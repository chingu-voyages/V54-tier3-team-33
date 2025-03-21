import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
import { searchProducts, loadProducts } from "../../store/slices/productSlice";
import { AppDispatch } from "../../store/store";
import Nav from "../Nav/Nav";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface HeaderProps {
  showAdvertising?: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const categories = [
    {
      name: "Electronics",
      subcategories: ["Smartphones", "Laptops", "Televisions"],
    },
    {
      name: "Clothing",
      subcategories: ["Jeans", "Sneakers", "Jackets"],
    },
    {
      name: "Music",
      subcategories: ["Guitars", "Keyboards", "Drums"],
    },
    /*{
      name: "Home Appliances",
      subcategories: ["Refrigerators", "Air Conditioners", "Washing Machines"],
    },
    {
      name: "Toys",
      subcategories: ["Dolls", "Action Figures", "Board Games"],
    },
    {
      name: "Sporting Goods",
      subcategories: ["Bicycles", "Skateboards", "Football"],
    },
    {
      name: "Jewelry & Watches",
      subcategories: ["Rings", "Necklaces", "Watches"],
    }*/
  ];

  const cartItems = useSelector((state: RootState) => state.cart.items);

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
    dispatch(
      searchProducts({ query: searchQuery, category: selectedCategory }),
    );
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
      <header className="flex items-center justify-between bg-white pt-4 pr-10 pb-4 pl-10 shadow-sm">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-30" />
        </div>

        <div className="mx-4 flex flex-1 items-center">
          <Menu as="div" className="relative">
            <MenuButton className="flex cursor-pointer items-center space-x-2 bg-white px-4 py-2 transition-colors hover:bg-gray-50">
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
              <MenuItems className="ring-opacity-5 absolute left-0 z-50 mt-2 w-[600px] origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                <div className="grid grid-cols-3 gap-4 p-4">
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
              className="flex-1 px-4 py-2 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              className="border-l border-gray-200 bg-transparent py-2 pr-6 pl-1 text-gray-500 focus:outline-none"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Clothing">Music</option>
              {/*<option value="Clothing">Home Appliances</option>
              <option value="Clothing">Toys</option>
              <option value="Clothing">Sporting Goods</option>
              <option value="Clothing">Jewelry & Watches</option>*/}
            </select>
          </div>
        </div>
        <button
          className="cursor-pointer rounded-md bg-[#3b82f6] px-6 py-3 text-white transition-colors hover:bg-[#2563eb]"
          onClick={handleSearch}
        >
          Search
        </button>
        <Link
            to="/shoppingCart"
            className="ml-3 size-7 text-gray-500 relative"
          >
            <ShoppingCartIcon />
            {cartItems.length > 0 && (
              <span className="absolute -top-3 right-0 flex size-5 animate-bounce items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>
      </header>
      <div className="mt-2 pt-1 pr-10 pl-10">
        <Nav />
      </div>
    </>
  );
};

export default Header;
