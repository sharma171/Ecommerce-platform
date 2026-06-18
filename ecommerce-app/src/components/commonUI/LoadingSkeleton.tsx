import React from 'react';

export const ProductCardSkeleton = () => (
    <div className="bg-white rounded-2xl p-5 w-full h-[400px] shadow-sm animate-pulse flex flex-col border border-gray-100">
        <div className="bg-gray-200 w-full h-48 rounded-xl mb-4"></div>
        <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-full rounded mb-4"></div>
        <div className="mt-auto flex justify-between items-center mb-4">
            <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
        </div>
        <div className="flex flex-col gap-3">
            <div className="bg-gray-200 h-10 w-full rounded-xl"></div>
            <div className="bg-gray-200 h-10 w-full rounded-xl"></div>
        </div>
    </div>
);

export const ProductGridSkeleton = () => (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {Array.from({ length: 6 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
        ))}
    </div>
);

export const CategoryGridSkeleton = ({ isViewAllMode }: { isViewAllMode?: boolean }) => {
    const count = isViewAllMode ? 8 : 3;
    const gridClass = isViewAllMode ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 sm:grid-rows-2';
    return (
        <div className={`grid grid-cols-1 gap-y-6 sm:gap-x-6 lg:gap-8 ${gridClass}`}>
            {Array.from({ length: count }).map((_, idx) => {
                let cardClasses = 'bg-gray-200 rounded-2xl w-full animate-pulse shadow-md';
                if (!isViewAllMode) {
                    cardClasses += idx === 0 ? ' aspect-[2/1] sm:row-span-2 sm:aspect-square' : ' aspect-[2/1] sm:aspect-auto';
                } else {
                    cardClasses += ' aspect-[4/5]';
                }
                return <div key={idx} className={cardClasses}></div>;
            })}
        </div>
    );
};
