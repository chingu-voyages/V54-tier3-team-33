import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid"; 
import logo from "../../assets/logo.png";
import { searchProducts, loadProducts } from "../../store/slices/productSlice"; 
import { RootState, AppDispatch } from "../../store/store"; 
import Nav from "../Nav/Nav";
import AdvertisingCarousel from "../AdvertisingCarousel/AdvertisingCarousel";

interface HeaderProps {
  showAdvertising?: boolean; 
}

const Header: React.FC<HeaderProps> = ({ showAdvertising = false }) => {
  const categories = ["Electronics", "Clothing", "Home", "Toys", "Sporting Goods", "Jewelry & Watches"];
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch: AppDispatch = useDispatch(); 
  const { searchResults, loading, error } = useSelector((state: RootState) => state.products);

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

  const trendingLaptops = selectedCategory === ""
    ? searchResults.filter(product => 
        product.category === "Electronics" && product.name.toLowerCase().includes("laptop")
      )
    : [];

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
              <option value="Clothing">Home</option>
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
        {showAdvertising && ( 
          <div className="mb-4">
            <AdvertisingCarousel />
            {selectedCategory === "" && trendingLaptops.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Trending Laptops</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {trendingLaptops.map((product) => ( 
                    <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg"
                      />
                      <h3 className="text-purple-400 text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-700">Price: ${product.price}</p>
                      <p className="text-gray-700">Delivery Cost: ${product.deliveryCost}</p>
                      <p className="text-gray-700">Country: {product.country}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {loading ? ( 
          <p className="text-center text-gray-500">Loading products...</p>
        ) : error ? ( 
          <p className="text-center text-red-500">{error}</p>
        ) : searchResults.length > 0 ? ( 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => ( 
              <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
                <h3 className="text-purple-400 text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className="text-gray-700">Delivery Cost: ${product.deliveryCost}</p>
                <p className="text-gray-700">Country: {product.country}</p>
              </div>
            ))}
          </div>
        ) : ( 
          <p className="text-center text-gray-500">No products found. Try searching for something!</p>
        )}
      </div>
    </>
  );
};

export default Header;