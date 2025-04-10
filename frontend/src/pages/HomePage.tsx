import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";
import Grid from "../components/Grid/Grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/store";
import { useEffect } from "react";
import { loadProducts, setSearchQuery } from "../store/slices/productSlice";
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
  const search = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(setSearchQuery(search));
    dispatch(loadProducts({ page, limit }));
  }, [dispatch, search, page, limit]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ search, page: newPage.toString(), limit: limit.toString() });
  };

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
