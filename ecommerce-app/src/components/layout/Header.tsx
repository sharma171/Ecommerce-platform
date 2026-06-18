import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useSelector } from 'react-redux';



export default function Header() {
    const allProducts = useSelector((state: any) => state.ecommerce.allProducts);
    const allCategories = useSelector((state: any) => state.ecommerce.allCategories);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
    const [mobileActiveTab, setMobileActiveTab] = useState('women');

    const { totalItems, setIsCartOpen } = useCart();
    const [animateBadge, setAnimateBadge] = useState(false);

    useEffect(() => {
        if (totalItems > 0) {
            setAnimateBadge(true);
            const timer = setTimeout(() => setAnimateBadge(false), 300);
            return () => clearTimeout(timer);
        }
    }, [totalItems]);

    return (
        <div className="bg-white z-50 relative border-b border-gray-200">

            {mobileMenuOpen && (
                <div className="relative z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />

                    <div className="fixed inset-0 z-40 flex">
                        <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                            <div className="flex px-4 pb-2 pt-5">
                                <button
                                    type="button"
                                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>









                        </div>
                    </div>
                </div>
            )}

            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center">
                        <button
                            type="button"
                            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>


                        <div className="ml-4 flex lg:ml-0">
                            <Link to="/">
                                Bhanu
                            </Link>
                        </div>


                        <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">



                            </div>
                        </div>

                        <div className="ml-auto flex items-center">





                            <div className="ml-4 flow-root lg:ml-6">
                                <button onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }} className="group -m-2 flex items-center p-2 cursor-pointer">
                                    <div className="relative">
                                        <svg className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        {totalItems > 0 && (
                                            <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white transition-transform duration-300 ${animateBadge ? 'scale-125' : 'scale-100'}`}>
                                                {totalItems}
                                            </span>
                                        )}
                                    </div>
                                    <span className="sr-only">items in cart, view bag</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
