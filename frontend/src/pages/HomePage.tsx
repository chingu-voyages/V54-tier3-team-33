import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";
import Grid from "../components/Grid/Grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/store";
import React , { useEffect } from "react";
import {
  loadProducts ,
  setCategory ,
  setMaxPrice ,
  setMinPrice ,
  setSearchQuery , setSort ,
  setSubcategory ,
} from "../store/slices/productSlice";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../utils/ScrollToTop";

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
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    dispatch(setSearchQuery(search));
    dispatch(setCategory(category));
    dispatch(setSubcategory(subcategory));
    dispatch(setMinPrice(minPrice));
    dispatch(setMaxPrice(maxPrice));
    dispatch(setSort(sort))
    dispatch(loadProducts({ page, limit }));

  }, [
    dispatch,
    search,
    page,
    limit,
    category,
    subcategory,
    minPrice,
    maxPrice,
    sort
  ]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      search,
      category,
      subcategory,
      maxPrice,
      minPrice,
      sort,
      page: newPage.toString(),
      limit: limit.toString(),
    });
  };

  return (
    <>
      <div className="flex items-center justify-center">
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

      <ScrollToTop/>
      <Toaster />
    </>
  );
};

export default HomePage;
