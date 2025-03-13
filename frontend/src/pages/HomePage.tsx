import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { loadProducts } from "../../src/store/slices/productSlice"; 
import { RootState, AppDispatch } from "../../src/store/store"
import ProductList from "../../src/components/ProductList/ProductList";
import AdvertisingCarousel from "../../src/components/AdvertisingCarousel/AdvertisingCarousel";

const HomePage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch(); 
    const { searchResults, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
      dispatch(loadProducts()); 
    }, [dispatch]);
 
    return (
      <>
        <Header showAdvertising={true}/>
        <div className="mb-4 pr-10 pl-10">
          <AdvertisingCarousel />
        </div>
        <ProductList loading={loading} error={error} searchResults={searchResults} />
      </>
    );
};

export default HomePage;