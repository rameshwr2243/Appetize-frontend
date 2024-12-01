import React, { createContext, useReducer } from 'react';

// Create CartContext
const CartContext = createContext();

// Define initial state for the cart
const initialState = { cart: [] };

// Define the cart reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { cart: [...state.cart, action.payload] };
        case 'REMOVE_FROM_CART':
            return { cart: state.cart.filter(item => item.id !== action.payload) };
        default:
            return state;
    }
};

// Create CartProvider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Export CartContext as named export
export { CartContext };
