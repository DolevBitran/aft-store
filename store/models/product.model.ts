import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import axios from 'service/api';



const INITIAL_STATE: ProductState = {
    product: null
};

export const product: any = createModel<RootModel>()({
    name: 'product',
    state: INITIAL_STATE,
    reducers: {
        SET_PRODUCT: (state: ProductState, payload: ProductState['product']): ProductState => ({ ...state, product: payload }),
    },
    effects: (dispatch: Dispatch) => ({
        async getProduct(payload) {
            try {
                const res = await axios.get(`/api/product/${payload}`)
                console.log(res.data)
                this.SET_PRODUCT(res.data.product)
                // this.SET_CATEGORIES(res.data.categories)
            } catch (err) {

            }
        },
        async save(payload) {
            console.log({ payload })
            try {
                console.log(payload)
                const res = await axios.post('/api/product', payload)
                console.log(res)
            } catch (err) {

            }
        },
    }),
});
