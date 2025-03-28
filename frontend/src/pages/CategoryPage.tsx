import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import Grid from "../components/Grid/Grid";
const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products } = useSelector((state: RootState) => state.products);

  const subcategories = {
    electronics: ["Laptops", "Smartphones", "Televisions"],
    clothing: ["Jeans", "Sneakers", "Jackets"],
    music: ["Guitars", "Keyboards", "Drums"],
  };

  const getProductsBySubcategory = (subcategory: string) => {
    return products
      .filter(product => 
        product.category?.toLowerCase() === categoryName?.toLowerCase() &&
        product.subcategory?.toLowerCase() === subcategory.toLowerCase()
      )
      .slice(0, 3); 
  };

  return (
    <div>
      <Header showNav={false} />
      <div className="container mx-auto px-4 py-6 flex">
        <div className="w-1/6 pr-8">
          <h2 className="text-4xl font-bold mb-4 capitalize">{categoryName}</h2>
          <ul className="space-y-2">
            {subcategories[categoryName as keyof typeof subcategories]?.map((subcategory) => (
              <li key={subcategory}>
                <Link
                  to={`/category/${categoryName}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-blue-600 hover:underline"
                >
                  {subcategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4">
          <div className="text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold capitalize">{categoryName}</span>
          </div>

          {subcategories[categoryName as keyof typeof subcategories]?.map((subcategory) => {
            const subcategoryProducts = getProductsBySubcategory(subcategory);
            
            return (
              <div key={subcategory} className="mb-12">
                <h3 className="text-2xl font-bold mb-4">{subcategory}</h3>
                {subcategoryProducts.length > 0 ? (
                  <Grid 
                    products={subcategoryProducts} 
                    loading={false} 
                    error={null} 
                  />
                ) : (
                  <p className="text-gray-500">No products found in this category</p>
                )}
                <div className="mt-4 text-left">
                  <Link 
                    to={`/category/${categoryName}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-blue-600 hover:underline"
                  >
                    View all {subcategory} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;