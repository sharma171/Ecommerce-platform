import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCategory from "../components/productscategory/ProductCategory";
import ProductGrid from "../components/product/ProductGrid";

function HomePage() {
    const [searchParams] = useSearchParams();
    const [isViewAllMode, setIsViewAllMode] = useState(false);
    
    const hasFilters = Array.from(searchParams.keys()).some(
        key => ['title', 'price_min', 'price_max', 'categoryId', 'sortBy'].includes(key)
    );

    useEffect(() => {
        if (hasFilters) {
            setIsViewAllMode(false);
        }
    }, [hasFilters]);

    return (
        <div>
            {!hasFilters && (
                <ProductCategory 
                    isViewAllMode={isViewAllMode} 
                    onViewAll={() => setIsViewAllMode(true)}
                    onCloseViewAll={() => setIsViewAllMode(false)}
                />
            )}
            {(hasFilters || !isViewAllMode) && <ProductGrid />}
        </div>
    );
}

export default HomePage;