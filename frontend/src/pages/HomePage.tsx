import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";
import Grid from "../components/AllProducts/Grid.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/store";
import React, { useEffect } from "react";
import {
  loadProducts,
  setCategory,
  setMaxPrice,
  setMinPrice,
  setSearchQuery,
  setSort,
  setSubcategory,
} from "../store/slices/productSlice";
import { useSearchParams } from "react-router-dom";

import ScrollToTop from "../utils/ScrollToTop";
import { ProductsSkeletonLoader } from "../components/AllProducts/ProductSkeleton.tsx";
import { SortDropdown } from "../components/AllProducts/Sorting.tsx";
import PriceInput from "../components/AllProducts/PriceInput.tsx";
import { Pagination } from "../components/AllProducts/Pagination.tsx";
import ScrollToSection from "../utils/ScrollToSection.tsx";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error, totalPages } = useSelector(
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
    dispatch(setSort(sort));
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
    sort,
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
      <ScrollToSection />
      <div className="flex items-center justify-center">
        <AdvertisingCarousel />
      </div>
      <div className="mx-auto my-6 flex flex-col items-center justify-center gap-6 px-4 md:max-w-7xl">
        <div className="flex w-full items-center">
          <p className="text-3xl font-semibold">{category}</p>
          <p className="flex items-center text-2xl font-medium">
            {subcategory && (
              <>
                <span className="mx-2">/</span>
                {subcategory}
              </>
            )}
          </p>
        </div>

        <div
          id="productsSection"
          className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row"
        >
          <PriceInput />
          <SortDropdown />
        </div>
      </div>
      {loading ? (
        <ProductsSkeletonLoader />
      ) : (
        <Grid
          products={products}
          limit={limit}
          loading={loading}
          error={error}
        />
      )}
      <Pagination
        totalPage={totalPages}
        onPageChange={handlePageChange}
        currentPage={page}
      />
      <ScrollToTop />
    </>
  );
};

export default HomePage;
