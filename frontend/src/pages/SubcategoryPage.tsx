import { useParams } from "react-router-dom";
import Grid from "../components/Grid/Grid";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const SubcategoryPage = () => {
  const { categoryName, subcategoryName } = useParams();
  const { products } = useSelector((state: RootState) => state.products);

  const filteredProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() === categoryName?.toLowerCase() &&
      product.subcategory?.toLowerCase() === subcategoryName?.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link 
          to={`/category/${categoryName}`} 
          className="hover:underline capitalize"
        >
          {categoryName}
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold capitalize">{subcategoryName}</span>
      </div>

      <h1 className="text-3xl font-bold capitalize mb-8">
        {subcategoryName}
      </h1>

      <Grid 
        products={filteredProducts} 
        loading={false} 
        error={null} 
      />
    </div>
  );
};

export default SubcategoryPage;