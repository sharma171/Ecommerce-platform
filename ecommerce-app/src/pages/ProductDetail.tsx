import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useApiFunctions from "../components/apiRoutes/apiFunctions";
import ProductCard from "../components/product/ProductCard";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart, cartItems } = useCart();
    const { getRelatedProducts } = useApiFunctions();

    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    const cartItem = product ? cartItems.find((item: any) => item.id === product.id) : null;
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
                if (!response.ok) throw new Error("Product not found");
                const data = await response.json();

                let parsedImages = data.images || [];
                if (typeof parsedImages[0] === 'string' && parsedImages[0].startsWith('[')) {
                    try { parsedImages = JSON.parse(parsedImages[0]); } catch (e) { }
                } else if (parsedImages.length === 1 && typeof parsedImages[0] === 'string' && parsedImages[0].includes('\"')) {
                    try { parsedImages = JSON.parse(parsedImages[0]); } catch (e) { }
                }

                setProduct({ ...data, images: parsedImages });

                // Fetch related products
                if (id) {
                    const related = await getRelatedProducts(id);
                    // Filter out the current product from related products
                    setRelatedProducts((related || []).filter((p: any) => p.id !== parseInt(id, 10)));
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin shadow-md"></div>
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center max-w-md w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto text-gray-300 mb-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Oops!</h2>
                <p className="text-gray-500 mb-8 font-medium">{error || "Product not found."}</p>
                <Link to="/" className="inline-block w-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md">
                    Back to Shopping
                </Link>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Products
                    </Link>
                </div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
                        <div className="flex lg:flex-col gap-3 overflow-x-auto p-2 lg:overflow-y-auto m-[5px] lg:w-28 pb-2 lg:pb-0 scrollbar-hide">
                            {product.images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative flex-shrink-0 h-24 w-24 lg:h-28 lg:w-full rounded-2xl overflow-hidden bg-gray-100 transition-all ${activeImage === idx ? 'ring-2 ring-indigo-600 ring-offset-4 shadow-md' : 'ring-1 ring-transparent opacity-60 hover:opacity-100 cursor-pointer'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 aspect-square lg:aspect-[4/5] min-h-[320px] rounded-3xl overflow-hidden bg-gray-50 relative group shadow-sm border border-gray-100">
                            <img
                                src={product.images[activeImage]}
                                alt={product.title}
                                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-gray-800 shadow-sm border border-gray-100">
                                {product.category?.name}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 px-4 sm:px-0 lg:mt-0 flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                                {product.title}
                            </h1>
                        </div>

                        <div className="mb-6">
                            <p className="text-4xl font-black text-indigo-600">${product.price}</p>
                        </div>

                        <div className="mb-8 border-t border-gray-100 pt-8 flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                                </svg>
                                Description
                            </h3>
                            <div className="prose prose-sm text-gray-600 text-base leading-relaxed font-medium">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4 border-t border-gray-100 pt-8">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-indigo-600 border border-transparent rounded-2xl py-4 px-8 flex items-center justify-center text-lg font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] gap-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                {quantityInCart > 0 ? `Add to Cart (${quantityInCart})` : 'Add to Cart'}
                            </button>
                        </div>

                        <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="flex items-center gap-4 text-sm text-gray-700 font-bold">
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-900 text-base mb-0.5">Free shipping on all orders over $50</p>
                                    <p className="text-gray-500 font-medium text-xs">Arrives in 3-5 business days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-24 border-t border-gray-100 pt-16">
                        <div className="mb-10 flex items-center justify-between">
                            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-600">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                Recommended Products
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {relatedProducts.slice(0, 4).map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}