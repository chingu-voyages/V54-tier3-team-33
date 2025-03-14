import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { loadProducts } from "../../src/store/slices/productSlice"; 
import { RootState, AppDispatch } from "../../src/store/store"
import ProductList from "../../src/components/ProductList/ProductList";
import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";

const HomePage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch(); 
    const { products, searchResults, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
      dispatch(loadProducts()); 
    }, [dispatch]);

    const productsToDisplay = searchResults.length > 0 ? searchResults : products;
 
    return (
      <>
        <Header showAdvertising={true}/>
        <div className="mb-4 pr-10 pl-10">
          <AdvertisingCarousel />
        </div>
        <ProductList loading={loading} error={error} searchResults={productsToDisplay} />
      </>
    );
};

export default HomePage;