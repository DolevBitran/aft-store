import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import axios from 'service/api';



const INITIAL_STATE: CartState = {
    cartItems: null
};

export const cart: any = createModel<RootModel>()({
    name: 'cart',
    state: INITIAL_STATE,
    reducers: {
        SET_CART_ITEMS: (state: CartState, payload: CartState['cartItems']): CartState => ({ ...state, cartItems: payload }),
        SET_ITEM: (state: CartState, payload: CartItem): CartState => ({ ...state, cartItems: { ...state.cartItems, [payload._id]: payload } }),
        SET_ITEM_QUANTITY: (state: CartState, payload: CartItem): CartState => ({ ...state, cartItems: { ...state.cartItems, [payload._id]: { ...(state.cartItems as CartMap)[payload._id], quantity: payload.quantity } } }),
    },
    effects: (dispatch: Dispatch) => ({
        async appendProducts(payload) {
            try {
                this.APPEND_PRODUCTS(payload)
            } catch (err) {

            }
        },
        resetCart() {
            this.SET_CART_ITEMS(null)
        },
        async fetchCart(payload) {
            try {
                const res = await axios.get('/api/cart')
                const formattedData: { [cartItemId: string]: CartItem } = {}
                res.data.cartItems.forEach((cartItem: CartItem) => {
                    formattedData[cartItem._id] = cartItem
                });
                console.log('fetchCart', formattedData)
                this.SET_CART_ITEMS(formattedData)
            } catch (err) {
                console.error('fetchCart', err)
            }
        },
        async addToCart(payload, state) {
            try {
                const res = await axios.post('/api/cart', payload)
                console.log('addToCart', res.data.cartItem)
                const { cartItem } = res.data
                if (state.cart.cartItems?.[payload._id]) {
                    this.SET_ITEM_QUANTITY(payload)
                } else {
                    this.SET_ITEM(cartItem)
                }
            } catch (err) {
                console.error('addToCart', err)
            }
        },
    }),
});
