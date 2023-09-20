import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import axios from 'service/api';



const INITIAL_STATE: AppState = {
    navigator: null,
    ejectInterceptors: null,
    RTL: false
    // room: ROOM_MODE.TABLE
};

export const app: any = createModel<RootModel>()({
    name: 'app',
    state: INITIAL_STATE,
    reducers: {
        // SET_ROOM_MODE: (state: AppState, payload: typeof ROOM_MODE): AppState => ({ ...state, room: payload }),
        SET_NAVIGATOR: (state: AppState, payload: AppState['navigator']): AppState => ({ ...state, navigator: payload }),
        SET_RTL: (state: AppState, payload: AppState['RTL']): AppState => ({ ...state, RTL: payload }),
        SET_EJECT_INTERCEPTORS_FN: (state: AppState, payload: AppState['ejectInterceptors']): AppState => ({ ...state, ejectInterceptors: payload }),
    },
    effects: (dispatch: Dispatch) => ({
        saveNewProduct(payload) {
            try {
                axios.post('url', {})
            } catch (err) {

            }
        },
    }),
});
