import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import useApiFunctions from '../apiRoutes/apiFunctions';
import { useSelector } from 'react-redux';
import FilterBar from './FilterBar';
import { withLoadingSkeleton } from '../AnimatingComponents/withLoadingSkeleton';
import { ProductGridSkeleton } from '../commonUI/LoadingSkeleton';
import ProductCard from './ProductCard';
import { AnimatePresence, motion } from 'framer-motion';

const ProductListBase = ({ allProducts }: { allProducts: any[] }) => {
    if (allProducts?.length === 0) {
        return <div className="text-center text-gray-500 py-10 font-medium bg-white rounded-2xl shadow-sm border border-gray-100 p-8">No products found matching your filters.</div>;
    }
    return (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {allProducts?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

const ProductListWithLoading = withLoadingSkeleton(ProductListBase, ProductGridSkeleton);

export default function ProductGrid() {
    const { getFilteredProducts, getAllProducts, getAllCategories, loading, error } = useApiFunctions();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const path = location.pathname;

    const allProducts = useSelector((state: any) => state.ecommerce.allProducts);
    const allCategories = useSelector((state: any) => state.ecommerce.allCategories);

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [showFab, setShowFab] = useState(false);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        const filters: any = {};
        if (searchParams.get('title')) filters.title = searchParams.get('title');
        if (searchParams.get('price_min')) filters.price_min = searchParams.get('price_min');
        if (searchParams.get('price_max')) filters.price_max = searchParams.get('price_max');
        if (searchParams.get('categoryId')) filters.categoryId = searchParams.get('categoryId');
        if (searchParams.get('sortBy')) filters.sortBy = searchParams.get('sortBy');

        const hasFilters = Object.keys(filters).length > 0;

        if (!hasFilters && path === "/") {
            getAllProducts();
        } else {
            getFilteredProducts(filters);
        }
    }, [searchParams, path]);

    useEffect(() => {
        const checkVisibility = () => {
            if (gridRef.current) {
                const rect = gridRef.current.getBoundingClientRect();
                // The grid is in view if its top is above the bottom of the viewport 
                // and its bottom is below the top of the viewport
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                setShowFab(inView);
            }
        };

        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility, { passive: true });

        // Initial check after a short delay to ensure rendering is complete
        setTimeout(checkVisibility, 100);

        return () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
        };
    }, []);

    return (
        <div className="bg-gray-50 py-16 sm:py-24" ref={gridRef}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


                <div className="flex items-center justify-between mb-3">
                    <h2 className=" h-[50px] text-3xl font-extrabold lg:hidden tracking-tight text-gray-900">Our Products</h2>
                </div>
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
                    <div className="hidden lg:block lg:col-span-1 sticky top-6 self-start">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className=" h-[50px] text-3xl font-extrabold tracking-tight text-gray-900">Our Products</h2>
                        </div>
                        <FilterBar categories={allCategories} />
                    </div>
                    <AnimatePresence>
                        {isFilterModalOpen && (
                            <motion.div
                                initial={{ y: '100%', opacity: 1 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: '100%', opacity: 1 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-0 z-[110] bg-white/95 backdrop-blur-md lg:hidden overflow-y-auto pt-6 px-4 pb-20"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Choose Preference</h2>
                                    <button onClick={() => setIsFilterModalOpen(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <FilterBar categories={allCategories} onApply={() => setIsFilterModalOpen(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showFab && !isFilterModalOpen && (
                            <motion.button
                                initial={{ y: 100, opacity: 1 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 1 }}
                                onClick={() => setIsFilterModalOpen(true)}
                                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600 text-white px-6 py-3.5 rounded-full shadow-2xl font-bold flex items-center gap-2 lg:hidden hover:bg-indigo-700 hover:scale-105 transition-transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                </svg>
                                Filters
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div className="lg:col-span-3">
                        {error ? (
                            <div className="text-center text-red-500 py-10 font-medium">Failed to load products.</div>
                        ) : (
                            <ProductListWithLoading isLoading={loading} allProducts={allProducts} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
