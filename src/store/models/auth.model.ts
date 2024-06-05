import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import axios from 'service/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromStorage, removeFromStorage, saveToStorage } from '../../service/storage';
import { AuthSessionResult } from 'expo-auth-session';
import { createInterceptors } from 'service/api';


const INITIAL_STATE: AuthState = {
    user: null,
    token: null,
}

type Response = {
    success: boolean
}

type UserLoginResponse = Response & {
    user: User,
    accessToken: string,
    refreshToken: string
}
type UserRetrieveResponse = Response & {
    user: User,
    accessToken: string,
    refreshToken: string
}
type TokenRefreshResponse = Response & {
    accessToken: string,
    refreshToken: string
}

export const auth: any = createModel<RootModel>()({
    name: 'auth',
    state: INITIAL_STATE,
    reducers: {
        SET_USER: (state: AuthState, payload: User | null): AuthState => ({ ...state, user: payload }),
        // SET_TOKEN: (state: AuthState, payload: AuthState['token']): AuthState => ({ ...state, token: payload }),
    },
    effects: (dispatch: Dispatch) => ({
        async setUser(user: User | null, state: RootModel) {
            this.SET_USER(user)
            if (user) {
                const [ejectInterceptors] = createInterceptors()
                dispatch.app.registerEjectInterceptors(ejectInterceptors)
            }

        },
        async retrieveUser() {
            const accessToken = await getFromStorage('access_token');
            if (accessToken) {
                try {
                    const res: AxiosResponse<UserRetrieveResponse> = await axios.get('/auth/me', { headers: { Authorization: `Bearer ${accessToken}` } })
                    const { data } = res
                    await AsyncStorage.setItem('@user', JSON.stringify(data.user))
                    dispatch.auth.setUser(data.user)
                } catch (err) {
                    await removeFromStorage('access_token')

                }
            }
        },
        async requestSignInWithGoogle(response: AuthSessionResult) {
            const user = await AsyncStorage.getItem('@user')
            console.log(response)
            if (!user) {
                if (response?.type === 'success' && response.authentication?.accessToken) {
                    saveToStorage('access_token', response.authentication.accessToken)
                    await dispatch.auth.loginUser();
                }
            } else {
                dispatch.auth.setUser(JSON.parse(user))
            }
        },
        async loginUser() {
            const accessToken = await getFromStorage('access_token');
            if (!accessToken) {
                return
            }


            try {
                const res: AxiosResponse<UserLoginResponse> = await axios.get('/auth/google/login', { headers: { Authorization: `Bearer ${accessToken}` } })
                const { data } = res
                console.log(res)

                await AsyncStorage.setItem('@user', JSON.stringify(data.user))
                dispatch.auth.setUser(data.user)
                saveToStorage('access_token', data.accessToken)
                saveToStorage('refresh_token', data.refreshToken)
            } catch (err) {
                console.error(err)
            }
        },
        async refreshAccessToken() {
            const refreshToken = await getFromStorage('refresh_token');
            if (!refreshToken) {
                return dispatch.auth.logoutUser()
            }

            if (refreshToken) {
                try {
                    const res: AxiosResponse<TokenRefreshResponse> = await axios.post('/auth/token', {
                        refreshToken
                    })
                    const { data } = res
                    saveToStorage('access_token', data.accessToken)
                    saveToStorage('refresh_token', data.refreshToken)
                    return data.accessToken
                } catch (err) {
                    console.error(err)
                }
            }

            dispatch.auth.logoutUser()
        },
        async logoutUser() {
            this.SET_USER(null)
            dispatch.app.ejectInterceptors()
            await AsyncStorage.removeItem('@user')
            await removeFromStorage('access_token')
            await removeFromStorage('refresh_token')
        }
    }),
});
