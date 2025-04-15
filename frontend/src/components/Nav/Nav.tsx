import { useState } from "react";
import { Link } from "react-router-dom";
import electronics from "../../assets/nav-images/electronics.jpg";
import clothes from "../../assets/nav-images/clothes.jpg";
import instruments from "../../assets/nav-images/instruments.jpg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

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
          } relative justify-center py-1 md:flex`}
        >
          <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-18">
            <Link
              to="/"
              className="text-gray-700 transition-colors duration-200 hover:text-blue-600"
            >
              Home
            </Link>
            {categories.map((category) => (
              <div
                key={category.name}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onClick={() =>
                  setHoveredCategory(
                    hoveredCategory === category.name ? null : category.name,
                  )
                }
              >
                <button
                  onClick={() => console.log(category.name)}
                  className="bg-red-600 text-gray-700 transition-colors duration-200 hover:text-blue-600"
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>

          {hoveredCategory && (
            <div
              onMouseLeave={() => setHoveredCategory(null)}
              className="absolute top-full left-0 z-50 w-full rounded-md border border-gray-200 bg-white shadow-lg"
            >
              <div className="grid h-full grid-cols-1 gap-4 p-4 md:grid-cols-4">
                <div className="col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {categories
                    .filter((category) => category.name === hoveredCategory)
                    .map((category) => (
                      <div key={category.name} className="space-y-2">
                        <button className="block rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
                          {category.name}
                        </button>
                        <div className="space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              to={`/category/${category.name
                                .toLowerCase()
                                .replace(/ & /g, "-")
                                .replace(/\s+/g, "-")}/${subcategory
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="block rounded-md px-6 py-2 text-sm text-gray-500 hover:bg-gray-100"
                            >
                              {subcategory}
                            </Link>
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
