import React from "react"
import { useSelector } from "react-redux"
import { type RootState } from "../../store/store"
import { type AppDispatch } from "../../store/store"
import { useDispatch } from "react-redux"
import { setAllProducts, setFilteredProducts, setAllCategories, setLoading, setError } from "../../store/EcommerceSlice"


const ApiFunctions = () => {
    const allProducts = useSelector((state: RootState) => state.ecommerce.allProducts);
    const filteredProducts = useSelector((state: RootState) => state.ecommerce.filteredProducts);
    const allCategories = useSelector((state: RootState) => state.ecommerce.allCategories);
    const loading = useSelector((state: RootState) => state.ecommerce.loading);
    const error = useSelector((state: RootState) => state.ecommerce.error);
    const dispatch = useDispatch<AppDispatch>();

    async function getAllProducts() {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products");
            const data = await response.json();
            const sortedProducts = data.sort((a: any, b: any) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt));
            dispatch(setAllProducts(sortedProducts));
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function getAllCategories() {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/categories");
            const data = await response.json();
            dispatch(setAllCategories(data));
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
    async function getLimitedProducts(offset: number, limit: number) {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
            const data = await response.json();
            dispatch(setAllProducts(data));
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function getFilteredProducts(filters: any) {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const queryParams = new URLSearchParams();
            if (filters.title) queryParams.append('title', filters.title);
            if (filters.price_min) queryParams.append('price_min', filters.price_min.toString());
            if (filters.price_max) queryParams.append('price_max', filters.price_max.toString());
            if (filters.offset !== undefined) queryParams.append('offset', filters.offset.toString());
            if (filters.limit !== undefined) queryParams.append('limit', filters.limit.toString());

            let finalData: any[] = [];

            if (filters.categoryId && filters.categoryId.includes(',')) {
                // Multiple categories
                const categoryIds = filters.categoryId.split(',');
                const fetchPromises = categoryIds.map((id: string) => {
                    const params = new URLSearchParams(queryParams);
                    params.append('categoryId', id);
                    return fetch(`https://api.escuelajs.co/api/v1/products?${params.toString()}`).then(res => res.json());
                });
                
                const results = await Promise.all(fetchPromises);
                
                // Merge and deduplicate by ID
                const map = new Map();
                results.forEach(dataArr => {
                    if (Array.isArray(dataArr)) {
                        dataArr.forEach(item => {
                            if (!map.has(item.id)) map.set(item.id, item);
                        });
                    }
                });
                finalData = Array.from(map.values());
            } else {
                if (filters.categoryId) queryParams.append('categoryId', filters.categoryId.toString());
                const response = await fetch(`https://api.escuelajs.co/api/v1/products?${queryParams.toString()}`);
                finalData = await response.json();
            }

            if (filters.sortBy === 'price_asc') {
                finalData.sort((a: any, b: any) => a.price - b.price);
            } else if (filters.sortBy === 'price_desc') {
                finalData.sort((a: any, b: any) => b.price - a.price);
            } else {
                finalData.sort((a: any, b: any) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
            }

            dispatch(setAllProducts(finalData));
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function getRelatedProducts(productId: string | number) {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}/related`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Failed to fetch related products:", error);
            return [];
        }
    }

    return {
        getAllProducts,
        getAllCategories,
        getLimitedProducts,
        getFilteredProducts,
        getRelatedProducts,
        allProducts,
        filteredProducts,
        allCategories,
        loading,
        error,
    };
}

export default ApiFunctions;