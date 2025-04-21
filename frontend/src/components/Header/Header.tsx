import React, { Fragment, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";

import { AppDispatch, RootState } from "../../store/store";
import Nav from "../Nav/Nav";
import Button from "../../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/slices/authSlice";

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
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { searchQuery, category, subcategory, minPrice, maxPrice } =
    useSelector((state: RootState) => state.products);
  // destructure only setter function
  const [, setSearchParams] = useSearchParams();
  const [hoveredMyEbay, setHoveredMyEbay] = useState<boolean | null>(false);

  const handleSearch = () => {
    const params: Record<string, string> = {
      page: "1",
      limit: "10",
    };

    const filters = {
      category,
      subcategory,
      search: searchQuery.trim(),
      minPrice,
      maxPrice,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params[key] = value.toString();
      }
    });

    setSearchParams(params);
    dispatch(loadProducts({ page: 1, limit: 10 }));
    dispatch(setSearchQuery(""));
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

  console.log(user);

  return (
    <div className="text-darktext flex flex-col items-center">
      {/* Centered Article */}
      <div className="flex w-full justify-center px-5 py-2">
        <article className="relative flex w-full max-w-7xl items-center justify-between">
          <span className="flex gap-2">
            {user ? (
              <p>
                Welcome{" "}
                <span className="font-semibold">
                  {user.firstname} {user.lastname}
                </span>
              </p>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  className="text-primary text-sm font-semibold underline hover:no-underline"
                  to={"/createacc"}
                >
                  Create an Account
                </Link>
                or
                <Link
                  className="text-primary text-sm font-semibold underline hover:no-underline"
                  to={"/signinpage"}
                >
                  Sign in
                </Link>
              </div>
            )}
          </span>

          <div className="flex items-center gap-4">
            {user && (
              <div
                onMouseEnter={() => setHoveredMyEbay(true)}
                onMouseLeave={() => setHoveredMyEbay(false)}
                className="relative"
              >
                <Link
                  to="/profile"
                  className="flex cursor-pointer items-center gap-1 px-4 text-sm font-semibold"
                >
                  My eBay
                  <ChevronDownIcon className="h-4.5 w-4.5" />
                </Link>

                {hoveredMyEbay && (
                  <div
                    onMouseEnter={() => setHoveredMyEbay(true)}
                    onMouseLeave={() => setHoveredMyEbay(false)}
                    className="absolute top-full left-1/2 z-50 flex w-56 -translate-x-1/2 flex-col items-start rounded-xl border border-gray-200 bg-white p-1 shadow-lg"
                  >
                    <Link
                      to={"/profile"}
                      className="w-full rounded-lg p-2 text-start hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logOutUser({ navigate }));
                        console.log("User logged out");
                      }}
                      className="w-full cursor-pointer rounded-lg p-2 text-start text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link
              to="/shoppingCart"
              className="relative flex items-center gap-2"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 left-4 flex size-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </article>
      </div>

      <hr className="text-darktext/25 w-full" />

      <div className="w-full border-b border-gray-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-2 md:flex-nowrap">
          {/* logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-auto md:h-18"
                onClick={() => {
                  dispatch(setCategory(""));
                  dispatch(setSubcategory(""));
                }}
              />
            </Link>
          </div>

          {/* shop by categories dropdown */}
          <div className="flex flex-1 items-center gap-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex cursor-pointer items-center space-x-2 px-2 py-1 text-sm transition-colors sm:px-4 sm:py-2 sm:text-base">
                <span>Shop by Category</span>
                <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </MenuButton>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems className="absolute left-0 z-50 mt-2 max-h-[80vh] w-full origin-top-left overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none md:w-[600px]">
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

            {/* search bar */}
            <div className="flex flex-1 items-center overflow-hidden rounded-full border-2 border-gray-700">
              <MagnifyingGlassIcon className="ml-3 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for anything"
                className="sm:placeholder:text-customcolorone min-w-0 flex-1 px-4 py-2 text-sm outline-none placeholder:text-transparent sm:text-base"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
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

          {/* search button */}
          <Button
            variant="primary"
            className="hidden !w-46 sm:block"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      {showNav && <Nav />}
    </div>
  );
};

export default Header;
