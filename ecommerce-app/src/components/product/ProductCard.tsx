import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }: { product: any }) {
    const { addToCart, removeFromCart, cartItems } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const images = product.images || [];

    let parsedImages = images;
    if (typeof images[0] === 'string' && images[0].startsWith('[')) {
        try {
            parsedImages = JSON.parse(images[0]);
        } catch (e) { }
    } else if (images.length === 1 && typeof images[0] === 'string' && images[0].includes('\"')) {
        try {
            parsedImages = JSON.parse(images[0]);
        } catch (e) { }
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (parsedImages.length > 1) {
            timerRef.current = setTimeout(() => {
                intervalRef.current = setInterval(() => {
                    setCurrentImageIndex(prev => (prev + 1) % parsedImages.length);
                }, 700);
            }, 300);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCurrentImageIndex(0);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const cartItem = cartItems.find((item: any) => item.id === product.id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    return (
        <div
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col overflow-hidden border border-gray-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link to={`/product/${product.id}`} className="block aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 h-64 relative cursor-pointer">
                {parsedImages.map((img: string, idx: number) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${product.title} view ${idx + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-in-out ${idx === currentImageIndex
                            ? 'opacity-100 scale-110 z-10'
                            : 'opacity-0 scale-100 z-0'
                            }`}
                    />
                ))}

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm z-20">
                    {product.category?.name || 'Category'}
                </div>

                {parsedImages.length > 1 && isHovered && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {parsedImages.map((_: any, idx: number) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-indigo-600 w-3' : 'bg-white/80'}`} />
                        ))}
                    </div>
                )}
            </Link>

            <div className="flex-1 p-5 flex flex-col justify-between z-30 bg-white">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors">
                        <Link to={`/product/${product.id}`} className="focus:outline-none">
                            <span aria-hidden="true" className="absolute inset-0 z-0" />
                            {product.title}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-indigo-600">${product.price}</p>
                    <p className="text-xs text-gray-400 font-medium">{new Date(product.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="px-5 pb-5 flex gap-3 relative z-40 bg-white">
                <button
                    className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all active:scale-95"
                    onClick={(e) => { e.preventDefault(); addToCart(product); }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                    </svg>
                    {quantityInCart > 0 ? `Add (${quantityInCart})` : 'Add'}
                </button>
                {quantityInCart > 0 && (
                    <button
                        className="flex items-center justify-center p-2.5 rounded-full font-semibold text-red-500 bg-red-50 border border-red-100 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm hover:shadow-md"
                        onClick={(e) => { e.preventDefault(); removeFromCart(product.id); }}
                        title="Remove"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
