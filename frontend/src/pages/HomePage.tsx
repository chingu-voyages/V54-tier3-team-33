import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";
import Grid from "../components/Grid/Grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/store";
import { useEffect } from "react";
import { loadProducts } from "../../src/store/slices/productSlice";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    console.log("HomePage: Dispatching loadProducts");
    dispatch(loadProducts({ page: 1, limit: 20 }));
  }, [dispatch]);

  console.log("HomePage: Products:", products);
  console.log("HomePage: Loading:", loading);
  console.log("HomePage: Error:", error);

  // const productsToDisplay = searchResults.length > 0 ? searchResults : products;

  return (
    <>
      <div className="mb-4 pr-10 pl-10">
        <AdvertisingCarousel />
      </div>
      <Grid products={products} loading={loading} error={error} />;
    </>
  );
};

export default HomePage;
