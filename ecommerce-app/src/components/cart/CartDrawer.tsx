import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cartItems, totalItems, totalValue, addToCart, removeFromCart } = useCart();
    const [shouldRender, setShouldRender] = useState(isCartOpen);

    useEffect(() => {
        if (isCartOpen) setShouldRender(true);
        else {
            const timer = setTimeout(() => setShouldRender(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isCartOpen]);

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div 
                className={`absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} 
                onClick={() => setIsCartOpen(false)}
            />
            
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div 
                    className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out sm:duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex h-full flex-col bg-white shadow-2xl overflow-hidden">
                        
                        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 bg-white z-10 relative">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                Shopping Cart
                            </h2>
                            <button
                                type="button"
                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
                                onClick={() => setIsCartOpen(false)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-6 bg-white z-0">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 mb-4 text-gray-200">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <p className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</p>
                                    <p className="text-sm">Looks like you haven't added anything yet.</p>
                                    <button 
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-6 px-6 py-2.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold hover:bg-indigo-100 transition-colors active:scale-95"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                <ul role="list" className="-my-6 divide-y divide-gray-100">
                                    <AnimatePresence>
                                        {cartItems.map((item) => {
                                            let imgUrl = item.product.images[0];
                                            if (imgUrl && typeof imgUrl === 'string' && imgUrl.startsWith('[')) {
                                                try { imgUrl = JSON.parse(imgUrl)[0]; } catch(e){}
                                            }

                                            return (
                                                <motion.li 
                                                    key={item.id} 
                                                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="flex py-6 group"
                                                >
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                                                        <img
                                                            src={imgUrl}
                                                            alt={item.product.title}
                                                            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col justify-center">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3 className="line-clamp-2 pr-4 font-semibold text-gray-800"><a href="#">{item.product.title}</a></h3>
                                                                <p className="ml-4 font-bold text-indigo-600">${item.product.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{item.product.category?.name}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                                            <div className="flex items-center border border-gray-200 rounded-lg">
                                                                <button onClick={() => removeFromCart(item.id)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 rounded-l-lg active:bg-gray-200 transition-colors">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                                    </svg>
                                                                </button>
                                                                <span className="px-3 font-semibold text-gray-700">{item.quantity}</span>
                                                                <button onClick={() => addToCart(item.product)} className="px-2.5 py-1 text-gray-500 hover:bg-gray-100 rounded-r-lg active:bg-gray-200 transition-colors">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.li>
                                            );
                                        })}
                                    </AnimatePresence>
                                </ul>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50/80 backdrop-blur-md z-10 relative">
                                <div className="flex justify-between text-lg font-extrabold text-gray-900 mb-2">
                                    <p>Subtotal</p>
                                    <p>${totalValue.toFixed(2)}</p>
                                </div>
                                <p className="text-sm text-gray-500 font-medium mb-6">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-md hover:bg-indigo-700 transition-all hover:shadow-lg active:scale-[0.98]"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Checkout Now
                                    </a>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <button
                                            type="button"
                                            className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            Continue Shopping
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
