import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import axios from 'service/api';



const INITIAL_STATE: ProductsState = {
    categories: [],
    products: [],
    searchResults: [],
    categoryProducts: {}
    // room: ROOM_MODE.TABLE
};

export const products: any = createModel<RootModel>()({
    name: 'products',
    state: INITIAL_STATE,
    reducers: {
        SET_CATEGORIES: (state: ProductsState, payload: ProductsState['categories']): ProductsState => ({ ...state, categories: payload }),
        SET_PRODUCTS: (state: ProductsState, payload: ProductsState['products']): ProductsState => ({ ...state, products: payload }),
        SET_SEARCH_RESULTS: (state: ProductsState, payload: ProductsState['searchResults']): ProductsState => ({ ...state, searchResults: payload }),
        SET_CATEGORY_PRODUCTS: (state: ProductsState, payload: { id: string, products: ProductData[] }): ProductsState => ({ ...state, categoryProducts: { ...state.categoryProducts, [payload.id]: payload.products } }),
        APPEND_CATEGORIES: (state: ProductsState, payload: ProductsState['categories']): ProductsState => ({ ...state, categories: [...state.categories, ...payload] }),
        APPEND_PRODUCTS: (state: ProductsState, payload: ProductsState['products']): ProductsState => ({ ...state, products: [...state.products, ...payload] }),
    },
    effects: (dispatch: Dispatch) => ({
        async searchPoructs(payload) {
            try {
                if (payload) {
                    const res = await axios.get(`/api/product?title=${payload}`)
                    console.log('searchPoructs', { searchResults: res.data.products })
                    this.SET_SEARCH_RESULTS(res.data.products)
                } else {
                    this.SET_SEARCH_RESULTS([])
                }
            } catch (err) {
                console.error('searchPoructs', err)
            }
        },
        async fetchProducts(payload) {
            try {
                const res = await axios.get('/api/product?sort=-createdAt')
                console.log('fetchProducts', res.data)
                this.SET_PRODUCTS(res.data.products)
                // this.SET_CATEGORIES(res.data.categories)
            } catch (err) {
                console.error('fetchProducts', err)
            }
        },
        async fetchCategoryProducts(payload) {
            try {
                const res = await axios.get(`/api/product?category=${payload.categoryId}&page=${payload.page}`)
                console.log('fetchCategoryProducts', res.data)
                this.SET_CATEGORY_PRODUCTS({
                    id: payload.categoryId,
                    products: res.data.products
                })
            } catch (err) {
                console.error('fetchCategoryProducts', err)
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
