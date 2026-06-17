import React from "react";

const ProductCollections = () => {
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">

                            <div className="group relative">
                                <img
                                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg"
                                    alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                />
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href="#">
                                        <span className="absolute inset-0"></span>
                                        Desk and Office
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">
                                    Work from home accessories
                                </p>
                            </div>

                            <div className="group relative">
                                <img
                                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg"
                                    alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
                                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                />
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href="#">
                                        <span className="absolute inset-0"></span>
                                        Self-Improvement
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">
                                    Journals and note-taking
                                </p>
                            </div>

                            <div className="group relative">
                                <img
                                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg"
                                    alt="Collection of four insulated travel bottles on wooden shelf."
                                    className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                                />
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href="#">
                                        <span className="absolute inset-0"></span>
                                        Travel
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">
                                    Daily commute essentials
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCollections;