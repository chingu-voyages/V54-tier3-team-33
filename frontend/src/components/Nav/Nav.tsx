import { useState } from "react";
import {Link , useNavigate , useSearchParams} from "react-router-dom";
import electronics from "../../assets/nav-images/electronics.jpg";
import clothes from "../../assets/nav-images/clothes.jpg";
import instruments from "../../assets/nav-images/instruments.jpg";

import {
  loadProducts,
  setCategory,
  setSubcategory,
} from "../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

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

  const { searchQuery } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch();
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

    navigate({
      pathname: "/",
      search: `?${new URLSearchParams(params).toString()}`,
    });
    dispatch(loadProducts({ page: 1, limit: 10 }));
    setHoveredCategory(null);
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

    navigate({
      pathname: "/",
      search: `?${new URLSearchParams(params).toString()}`,
    });
    dispatch(loadProducts({ page: 1, limit: 10 }));
    setHoveredCategory(null);
  };

  return (
    <nav className="text-darktext">
      <div className="mx-auto max-w-7xl py-1 sm:px-6 lg:px-8">
        <div className="relative block justify-center md:flex">
          <div className="flex w-full flex-col justify-center sm:flex-row">
            <Link
              to="/"
              className="md hover:text-primary cursor-pointer px-10 py-2 text-center  transition-colors hover:underline"
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
                className="cursor-pointer px-10 py-2 "
              >
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className="hover:text-primary w-full cursor-pointer transition-colors hover:underline"
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
              className="absolute top-full left-0 z-50 hidden w-full rounded-xl border border-gray-300 bg-white shadow-lg sm:block"
            >
              <div className="grid h-full grid-cols-4 gap-4 p-4">
                <div className="col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {categories
                    .filter((category) => category.name === hoveredCategory)
                    .map((category) => (
                      <div key={category.name} className="space-y-2">
                        <button
                          onClick={() => handleCategoryClick(category.name)}
                          className="block cursor-pointer px-6 py-2  font-semibold hover:underline"
                        >
                          {category.name}
                        </button>
                        <div>
                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory}
                              onClick={() =>
                                handleSubcategoryClick(
                                  category.name,
                                  subcategory,
                                )
                              }
                              className="block cursor-pointer px-6 py-1  hover:underline"
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
                        className="h-auto w-94 rounded-md object-contain"
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
