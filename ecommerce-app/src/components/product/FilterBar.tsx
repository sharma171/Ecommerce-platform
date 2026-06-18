import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FilterBarProps {
    categories: any[];
    onApply?: () => void;
}

export default function FilterBar({ categories, onApply }: FilterBarProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [title, setTitle] = useState(searchParams.get('title') || '');
    const [priceMin, setPriceMin] = useState(searchParams.get('price_min') || '');
    const [priceMax, setPriceMax] = useState(searchParams.get('price_max') || '');
    const initialCategories = searchParams.get('categoryId') ? searchParams.get('categoryId')!.split(',') : [];
    const [categoryIds, setCategoryIds] = useState<string[]>(initialCategories);
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');

    useEffect(() => {
        setTitle(searchParams.get('title') || '');
        setPriceMin(searchParams.get('price_min') || '');
        setPriceMax(searchParams.get('price_max') || '');
        const cats = searchParams.get('categoryId') ? searchParams.get('categoryId')!.split(',') : [];
        setCategoryIds(cats);
        setSortBy(searchParams.get('sortBy') || 'newest');
    }, [searchParams]);

    const handleCategoryToggle = (id: string) => {
        setCategoryIds(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const handleApply = () => {
        const params = new URLSearchParams(searchParams);

        if (title) params.set('title', title); else params.delete('title');
        if (priceMin) params.set('price_min', priceMin); else params.delete('price_min');
        if (priceMax) params.set('price_max', priceMax); else params.delete('price_max');
        if (categoryIds.length > 0) params.set('categoryId', categoryIds.join(',')); else params.delete('categoryId');
        if (sortBy && sortBy !== 'newest') params.set('sortBy', sortBy); else params.delete('sortBy');

        setSearchParams(params);
        if (onApply) onApply();
    };

    const handleReset = () => {
        setTitle('');
        setPriceMin('');
        setPriceMax('');
        setCategoryIds([]);
        setSortBy('newest');

        const params = new URLSearchParams(searchParams);
        params.delete('title');
        params.delete('price_min');
        params.delete('price_max');
        params.delete('categoryId');
        params.delete('sortBy');
        setSearchParams(params);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>
                    Filters
                </h3>
                <button onClick={handleReset} className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                    Reset
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        Search Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Generic"
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                        Categories
                    </label>
                    <div className="max-h-24 overflow-y-auto space-y-2 rounded-xl border border-gray-200 p-3 bg-gray-50/50 shadow-inner">
                        {categories?.map((cat: any) => (
                            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={categoryIds.includes(cat.id.toString())}
                                        onChange={() => handleCategoryToggle(cat.id.toString())}
                                        className="peer sr-only"
                                    />
                                    <div className="h-5 w-5 rounded border border-gray-300 bg-white transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 group-hover:border-indigo-500 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{cat.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Price Range ($)
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            placeholder="Min"
                            min="0"
                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            placeholder="Max"
                            min="0"
                            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="sort" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                        </svg>
                        Sort By
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm bg-white"
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <button
                        onClick={handleApply}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
