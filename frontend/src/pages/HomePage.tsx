import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";
import Grid from "../components/Grid/Grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/store";
import { useEffect } from "react";
import { loadProducts } from "../../src/store/slices/localProductSlice";
//import { loadProducts } from "../../src/store/slices/productSlice";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, searchResults, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const productsToDisplay = searchResults.length > 0 ? searchResults : products;

  return (
    <>
      <div className="mb-4 pr-10 pl-10">
        <AdvertisingCarousel />
      </div>
      <Grid products={productsToDisplay} loading={loading} error={error} />
    </>
  );
};

export default HomePage;
