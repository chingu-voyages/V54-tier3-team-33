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
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-10">
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
          } md:flex justify-center py-1 relative`}
        >
          <div className="flex flex-col md:flex-row md:space-x-18 space-y-4 md:space-y-0">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Main Page
            </Link>
            {categories.map((category) => (
              <div
                key={category.name}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setHoveredCategory(hoveredCategory === category.name ? null : category.name)} // Toggle dropdown on mobile
              >
                <Link
                  to={`/category/${category.name
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/\s+/g, "-")}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>

          {hoveredCategory && (
            <div className="absolute left-0 top-full w-full bg-white rounded-md border border-gray-200 shadow-lg z-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 h-full">
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories
                    .filter((category) => category.name === hoveredCategory)
                    .map((category) => (
                      <div key={category.name} className="space-y-2">
                        <Link
                          to={`/category/${category.name
                            .toLowerCase()
                            .replace(/ & /g, "-")
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-gray-700 font-semibold rounded-md hover:bg-gray-100"
                        >
                          {category.name}
                        </Link>
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
                              className="block px-6 py-2 text-sm text-gray-500 rounded-md hover:bg-gray-100"
                            >
                              {subcategory}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="col-span-1 grid place-items-center h-full">
                  {categories
                    .filter((category) => category.name === hoveredCategory)
                    .map((category) => (
                      <img
                        key={category.name}
                        src={category.image}
                        alt={category.name}
                        className="w-94 h-auto rounded-md"
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