import { Link } from "react-router-dom"; 

const Nav = () => {
  const categories = [
    "Electronics",
    "Clothing",
    "Music",
    "Home Appliances",
    "Toys",
    "Sporting Goods",
    "Jewelry & Watches",
  ];

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-10">
        <div className="flex justify-center py-1"> 
          <div className="flex space-x-18"> 
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;