import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';



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
        registerEjectInterceptors(ejectFn: () => void) {
            this.SET_EJECT_INTERCEPTORS_FN(ejectFn)
        },
        ejectInterceptors(payload: undefined, state: RootModel) {
            state.app.ejectInterceptors && state.app.ejectInterceptors()
        },
        changeRTLMode(payload: boolean) {
            this.SET_RTL(payload)
        },
        initNavigator(payload: AppNavigationContainer) {
            this.SET_NAVIGATOR(payload);
        },
        navigateTo(payload: string | {
            name: string;
            key?: string | undefined;
            params?: object | undefined;
            path?: string | undefined;
            merge?: boolean | undefined;
        }, state: RootModel) {
            const navObj = typeof payload === 'string' ? { name: payload } : payload
            state.app.navigator.dispatch(CommonActions.navigate(navObj))
        }
    }),
});
