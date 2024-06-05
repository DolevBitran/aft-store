import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import axios from 'service/api';



const INITIAL_STATE: AppState = {
    navigator: null,
    ejectInterceptors: null,
    RTL: false
    // room: ROOM_MODE.TABLE
};

export const product: any = createModel<RootModel>()({
    name: 'product',
    state: INITIAL_STATE,
    reducers: {
        // SET_NAVIGATOR: (state: AppState, payload: AppState['navigator']): AppState => ({ ...state, navigator: payload }),
    },
    effects: (dispatch: Dispatch) => ({
        async save(payload) {
            try {
                console.log(payload)
                const res = await axios.post('/api/product', payload)
                console.log(res)
            } catch (err) {

            }
        },
    }),
});
