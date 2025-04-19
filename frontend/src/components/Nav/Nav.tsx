import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import electronics from "../../assets/nav-images/electronics.jpg";
import clothes from "../../assets/nav-images/clothes.jpg";
import instruments from "../../assets/nav-images/instruments.jpg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  loadProducts,
  setCategory,
  setSubcategory,
} from "../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Nav = () => {
  const categories = [
    {
      name: "Electronics",
      subcategories: ["Smartphones", "Laptops", "Televisions"],
      image: electronics,
    },
    {
      name: "Clothing",
      subcategories: ["Jeans", "Sneakers", "Jackets"],
      image: clothes,
    },
    {
      name: "Music",
      subcategories: ["Guitars", "Keyboards", "Drums"],
      image: instruments,
    },
  ];

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { searchQuery } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

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
    dispatch(loadProducts({ page: 1, limit: 10 })); // Trigger API call
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
    dispatch(loadProducts({ page: 1, limit: 10 })); // Trigger API call
  };

  return (
    <nav>
      <div className="mx-auto mb-4 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } relative justify-center md:flex`}
        >
          <div className="mt-4 flex flex-col md:flex-row md:space-y-0">
            <Link
              to="/"
              className="cursor-pointer bg-red-50 px-10 py-2 transition-colors hover:text-blue-600"
            >
              Home
            </Link>
            {categories.map((category) => (
              <div
                key={category.name}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() =>
                  setHoveredCategory(
                    hoveredCategory === category.name ? null : category.name,
                  )
                }
                className="cursor-pointer bg-red-50 px-10 py-2"
              >
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className="w-full cursor-pointer transition-colors hover:text-blue-600"
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>

          {hoveredCategory && (
            <div
              onMouseEnter={() => setHoveredCategory(hoveredCategory)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="absolute top-full left-0 z-50 w-full rounded-md border border-gray-200 bg-white shadow-lg"
            >
              <div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-4">
                <div className="col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {categories
                    .filter((category) => category.name === hoveredCategory)
                    .map((category) => (
                      <div key={category.name} className="space-y-2">
                        <button
                          onClick={() => handleCategoryClick(category.name)}
                          className="block rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        >
                          {category.name}
                        </button>
                        <div className="space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory}
                              onClick={() =>
                                handleSubcategoryClick(
                                  category.name,
                                  subcategory,
                                )
                              }
                              className="block rounded-md px-6 py-2 text-sm text-gray-500 hover:bg-gray-100"
                            >
                              {subcategory}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="col-span-1 grid h-full place-items-center">
                  {categories
                    .filter((category) => category.name === hoveredCategory)
                    .map((category) => (
                      <img
                        key={category.name}
                        src={category.image}
                        alt={category.name}
                        className="h-auto w-94 rounded-md"
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
