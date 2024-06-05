import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import axios from 'service/api';

import productss from 'mock/products.json';


const INITIAL_STATE: ProductsState = {
    categories: [],
    products: productss
    // room: ROOM_MODE.TABLE
};

export const products: any = createModel<RootModel>()({
    name: 'products',
    state: INITIAL_STATE,
    reducers: {
        SET_CATEGORIES: (state: ProductsState, payload: ProductsState['categories']): ProductsState => ({ ...state, categories: payload }),
        APPEND_CATEGORIES: (state: ProductsState, payload: ProductsState['categories']): ProductsState => ({ ...state, categories: [...state.categories, ...payload] }),
        APPEND_PRODUCTS: (state: ProductsState, payload: ProductsState['products']): ProductsState => ({ ...state, products: [...state.products, ...payload] }),
    },
    effects: (dispatch: Dispatch) => ({
        async appendProducts(payload) {
            try {
                this.APPEND_PRODUCTS(payload)
            } catch (err) {

            }
        },
        async fetchProducts(payload) {
            try {
                const res = await axios.get('/api/product?sort=-createdAt')
                console.log(res.data)
                // this.SET_CATEGORIES(res.data.categories)
            } catch (err) {

            }
        },
        async fetchCategoriesPreview(payload) {
            try {
                const res = await axios.get('/api/category/preview')
                console.log(res)
                this.SET_CATEGORIES(res.data.categories)
            } catch (err) {

            }
        },
        async fetchCategories(payload) {
            try {
                const res = await axios.get('/api/category')
                this.SET_CATEGORIES(res.data.categories)
            } catch (err) {

            }
        },
        saveNewProduct(payload) {
            try {
                axios.post('url', {})
            } catch (err) {

            }
        },
    }),
});
