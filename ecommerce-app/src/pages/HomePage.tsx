import React from "react";
import HeroSection from "../components/HeroSection";
import ProductCategory from "../components/productscategory/ProductCategory";
import ProductCollections from "../components/productscategory/ProductCollections";
import ProductGrid from "../components/product/ProductGrid";

function HomePage() {
    return (
        <div>
            <HeroSection />
            <ProductCategory />
            <ProductGrid />
            <ProductCollections />
        </div>
    );
}

export default HomePage