import { createModel } from '@rematch/core';
import { RootModel } from './index';
import { Dispatch } from '..';
import { CommonActions } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import axios from 'service/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromStorage, removeFromStorage, saveToStorage } from '../../service/storage';
import { AuthSessionResult } from 'expo-auth-session';
// import { createInterceptors } from 'service/api';


type UploadPercentage = {
    percentage: number,
    assetId: string,
}

const INITIAL_STATE: MediaState = {
    upload: {},
    assets: {}
}



export const media: any = createModel<RootModel>()({
    name: 'media',
    state: INITIAL_STATE,
    reducers: {
        SET_UPLOAD_PERCENTAGE: (state: MediaState, payload: UploadPercentage): MediaState => ({
            ...state,
            upload: { ...state.upload, [payload.assetId]: { percentage: payload.percentage } }
        }),
        APPEND_ASSET: (state: MediaState, payload: IAsset): MediaState => ({
            ...state,
            assets: { ...state.assets, [payload.assetId]: payload }
        }),
    },
    effects: (dispatch: Dispatch) => ({
        async setUploadPercentage(upload: UploadPercentage, state: RootModel) {
            this.SET_UPLOAD_PERCENTAGE(upload)
        },
        async appendAssets(assets: IAsset[], state: RootModel) {
            assets.forEach(asset => this.APPEND_ASSET(asset))
        },
    }),
});
