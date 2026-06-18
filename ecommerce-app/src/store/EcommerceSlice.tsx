import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EcommerceState {
    allProducts: any[];
    filteredProducts: any[];
    allCategories: string[];
    loading: boolean;
    error: string | null;
}

const initialState: EcommerceState = {
    allProducts: [],
    filteredProducts: [],
    allCategories: [],
    loading: false,
    error: null,
};

const EcommerceSlice = createSlice({
    name: "ecommerce",
    initialState,
    reducers: {
        setAllProducts: (state, action: PayloadAction<any[]>) => {
            state.allProducts = action.payload;
        },
        setFilteredProducts: (state, action: PayloadAction<any[]>) => {
            state.filteredProducts = action.payload;
        },
        setAllCategories: (state, action: PayloadAction<string[]>) => {
            state.allCategories = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setAllProducts,
    setFilteredProducts,
    setAllCategories,
    setLoading,
    setError,
} = EcommerceSlice.actions;

export default EcommerceSlice.reducer;
