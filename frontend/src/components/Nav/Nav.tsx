import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
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
    {
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
    },
  ];

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-10">
        <div className="flex justify-center py-1 relative"> 
          <div className="flex space-x-18">
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
              <div className="grid grid-cols-3 gap-4 p-4">
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;