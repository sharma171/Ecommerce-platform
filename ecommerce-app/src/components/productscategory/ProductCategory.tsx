import React from "react";
import { useSelector } from "react-redux";
import useApiFunctions from "../apiRoutes/apiFunctions";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { withCategoryHover } from "../AnimatingComponents/withCategoryHover";
import { withLoadingSkeleton } from "../AnimatingComponents/withLoadingSkeleton";
import { CategoryGridSkeleton } from "../commonUI/LoadingSkeleton";

const CategoryCardBase = ({ item, index, isViewAllCard, onClick }: { item: any, index: number, isViewAllCard?: boolean, onClick?: () => void }) => (
    <div
        className={`group relative h-full w-full cursor-pointer`}
        onClick={onClick}
    >
        <img
            src={item.image}
            alt={item.slug}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-0 flex items-end p-8 z-10">
            <div>
                <h3 className="font-bold text-white text-2xl mb-1 drop-shadow-md">
                    <span className="absolute inset-0" />
                    {isViewAllCard ? 'View All Categories' : item.name}
                </h3>
                <p aria-hidden="true" className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300 drop-shadow-sm">
                    {isViewAllCard ? 'Explore our collection \u2192' : 'Shop now \u2192'}
                </p>
            </div>
        </div>
    </div>
);

const HoverableCategoryCard = withCategoryHover(CategoryCardBase);

const CategoryListBase = ({ displayItems, isViewAllMode, handleCategoryClick }: any) => (
    <div className={`grid grid-cols-1 gap-y-6 sm:gap-x-6 lg:gap-8 ${isViewAllMode ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 sm:grid-rows-2'}`}>
        {displayItems.map((item: any, index: number) => {
            const isViewAllBtn = !isViewAllMode && index === 2;

            let cardClasses = 'relative rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300';
            if (!isViewAllMode) {
                cardClasses += index === 0 ? ' aspect-[2/1] sm:row-span-2 sm:aspect-square' : ' aspect-[2/1] sm:aspect-auto';
            } else {
                cardClasses += ' aspect-[4/5]';
            }

            return (
                <div key={item.id || index} className={cardClasses}>
                    <HoverableCategoryCard
                        item={item}
                        index={index}
                        isViewAllCard={isViewAllBtn}
                        categoryId={isViewAllBtn ? undefined : item.id}
                        onClick={() => handleCategoryClick(item.id, isViewAllBtn)}
                    />
                </div>
            );
        })}
    </div>
);

const CategoryListWithLoading = withLoadingSkeleton(CategoryListBase, CategoryGridSkeleton);

interface ProductCategoryProps {
    isViewAllMode?: boolean;
    onViewAll?: () => void;
    onCloseViewAll?: () => void;
}

const ProductCategory = ({ isViewAllMode = false, onViewAll, onCloseViewAll }: ProductCategoryProps) => {
    const { allCategories, loading } = useSelector((state: any) => state.ecommerce);
    const { getAllCategories } = useApiFunctions();
    const [searchParams, setSearchParams] = useSearchParams();

    let displayItems = [];
    if (isViewAllMode) {
        displayItems = allCategories || [];
    } else {
        displayItems = allCategories ? allCategories.slice(0, 3) : [];
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleCategoryClick = (categoryId: number, isViewAllBtn: boolean) => {
        if (!isViewAllMode && onViewAll) {
            onViewAll();
        } else {
            const params = new URLSearchParams(searchParams);
            params.set('categoryId', categoryId.toString());
            setSearchParams(params);
        }
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between mb-8">
                    <h2 className="text-4xl h-[50px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {isViewAllMode ? 'All Categories' : 'Trending Categories'}
                    </h2>
                    {isViewAllMode && (
                        <button
                            onClick={onCloseViewAll}
                            className="hidden cursor-pointer sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-all duration-300 ease-in-out hover:opacity-80"
                        >
                            &larr; Back to Home
                        </button>
                    )}
                </div>

                <CategoryListWithLoading
                    isLoading={loading}
                    displayItems={displayItems}
                    isViewAllMode={isViewAllMode}
                    handleCategoryClick={handleCategoryClick}
                />

                {!isViewAllMode && (
                    <div className="mt-6 sm:hidden">
                        <button onClick={onViewAll} className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                            Browse all categories
                            <span aria-hidden="true"> &rarr;</span>
                        </button>
                    </div>
                )}
                {isViewAllMode && (
                    <div className="mt-6 sm:hidden">
                        <button onClick={onCloseViewAll} className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                            &larr; Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCategory;