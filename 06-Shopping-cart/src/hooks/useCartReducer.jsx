import { cartReducer, cartIinitialState } from '../reducers/cart';
import { useReducer } from 'react';
export function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartIinitialState);

    const addToCart = (product) =>
        dispatch({
            type: 'ADD_TO_CART',
            payload: product,
        });
    const clearCart = () =>
        dispatch({
            type: 'CLEAR_CART',
        });
    const removeFromCart = (product) =>
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: product,
        });
    return { state, addToCart, clearCart, removeFromCart };
}
