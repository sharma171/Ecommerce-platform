import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: number;
    product: any;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    totalItems: number;
    totalValue: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const savedCart = localStorage.getItem('cartState');
            if (savedCart) {
                return JSON.parse(savedCart);
            }
        } catch (error) {
            console.error("Failed to parse cart from local storage", error);
        }
        return [];
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartState', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: any, quantity: number = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { id: product.id, product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === productId);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    return prevItems.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    return prevItems.filter(item => item.id !== productId);
                }
            }
            return prevItems;
        });
        setIsCartOpen(true);
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalValue = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            totalItems,
            totalValue,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
