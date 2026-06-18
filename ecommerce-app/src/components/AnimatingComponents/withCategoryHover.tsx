import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

export function withCategoryHover<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function HoverableCategoryCard(props: P & { categoryId?: number }) {
        const [isHovered, setIsHovered] = useState(false);
        const [products, setProducts] = useState<any[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

        const allProducts = useSelector((state: any) => state.ecommerce.allProducts) || [];

        const handleMouseEnter = () => {
            setIsHovered(true);
            if (props.categoryId && products.length === 0) {
                timerRef.current = setTimeout(() => {
                    fetchProducts();
                }, 500);
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };

        const fetchProducts = async () => {
            if (!props.categoryId) return;

            const existingProducts = allProducts.filter((p: any) => p.category?.id === props.categoryId);
            if (existingProducts.length > 0) {
                setProducts(existingProducts);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${props.categoryId}&limit=4`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch hover products", error);
            } finally {
                setIsLoading(false);
            }
        };

        const showOverlay = isHovered && products.length > 0;

        return (
            <div
                className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                    e.preventDefault();
                    if ((props as any).onClick) {
                        (props as any).onClick();
                    }
                }}
            >
                <WrappedComponent {...props} onClick={undefined} />


                <div
                    className={`absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    {products.length > 0 && products[0]?.images?.length > 0 && (
                        <div className="w-full h-full relative group/item">
                            <img src={products[0].images[0]} alt={products[0].title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover/item:scale-110" />
                            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/10 to-transparent opacity-80" />
                            <div className="absolute inset-0 flex items-end p-8">
                                <div>
                                    <h4 className="text-white font-bold text-xl mb-1 line-clamp-1">{products[0].title}</h4>
                                    <p className="text-sm font-medium text-indigo-300">Featured Item &bull; ${products[0].price}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {isLoading && isHovered && products.length === 0 && (
                    <div className="absolute top-4 right-4 z-30">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                )}
            </div>
        );
    };
}
