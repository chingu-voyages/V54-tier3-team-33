import { useParams } from "react-router-dom";
import Header from "../components/Header/Header"

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold text-center mt-8">
        Category: {categoryName}
      </h1>
      {/* We can place category-specific content here */}
    </div>
  );
};

export default CategoryPage;