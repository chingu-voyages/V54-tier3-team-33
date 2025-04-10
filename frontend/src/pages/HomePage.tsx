import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";
import Grid from "../components/Grid/Grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/store";
import { useEffect } from "react";
import { loadProducts } from "../../src/store/slices/productSlice";
import { useSearchParams } from "react-router-dom";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  // change item limit per page HERE
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  useEffect(() => {
    console.log("HomePage: Dispatching loadProducts with", { page, limit });
    dispatch(loadProducts({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
  };

  console.log("HomePage: Products:", products);
  console.log("HomePage: Loading:", loading);
  console.log("HomePage: Error:", error);

  return (
    <>
      <div className="mb-4 pr-10 pl-10">
        <AdvertisingCarousel />
      </div>
      <Grid
        products={products}
        currentPage={page}
        limit={limit}
        onPageChange={handlePageChange}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default HomePage;
