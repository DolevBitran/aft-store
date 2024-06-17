import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import axios from 'service/api';



const INITIAL_STATE: CartState = {
    cartItems: []
};

export const cart: any = createModel<RootModel>()({
    name: 'cart',
    state: INITIAL_STATE,
    reducers: {
        // SET_CATEGORIES: (state: ProductsState, payload: ProductsState['categories']): ProductsState => ({ ...state, categories: payload }),
        SET_CART_ITEMS: (state: CartState, payload: CartState['cartItems']): CartState => ({ ...state, cartItems: payload }),
        // SET_CATEGORY_PRODUCTS: (state: ProductsState, payload: { id: string, products: ProductData[] }): ProductsState => ({ ...state, categoryProducts: { ...state.categoryProducts, [payload.id]: payload.products } }),
        // APPEND_CATEGORIES: (state: ProductsState, payload: ProductsState['categories']): ProductsState => ({ ...state, categories: [...state.categories, ...payload] }),
        // APPEND_PRODUCTS: (state: ProductsState, payload: ProductsState['products']): ProductsState => ({ ...state, products: [...state.products, ...payload] }),
    },
    effects: (dispatch: Dispatch) => ({
        async appendProducts(payload) {
            try {
                this.APPEND_PRODUCTS(payload)
            } catch (err) {

            }
        },
        async fetchCart(payload) {
            try {
                const res = await axios.get('/api/cart')
                console.log(res.data)
                this.SET_CART_ITEMS(res.data.cartItems)
                // this.SET_CATEGORIES(res.data.categories)
            } catch (err) {

            }
        },
        async addToCart(payload) {
            console.log('addToCart')
            try {
                const res = await axios.post('/api/cart', payload)
                console.log(res)
            } catch (err) {
                console.error(err)
            }
        },
    }),
});
