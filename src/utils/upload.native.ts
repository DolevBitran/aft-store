import * as mime from 'mime';
import { AxiosRequestConfig } from 'axios';
import axios from 'service/api';
import { store } from 'store';

const FormData = global.FormData;

export const uploadAsset = async (asset: IAsset) => {
    try {
        const mimeType = mime.getType(asset.fileExtension) as string;
        const formData = new FormData()

        formData.append('assetId', asset.assetId);
        // @ts-ignore
        formData.append('asset', {
            uri: asset.uri,
            type: mimeType,
            name: `photo.${asset.fileExtension}`,
        });
        formData.append('mimeType', mimeType);
        formData.append('fileExtension', asset.fileExtension);

        const config: AxiosRequestConfig<FormData> = {
            method: 'post',
            url: '/image/m',
            responseType: "json",
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Content-Id': asset.assetId,
            },
            data: formData,
            transformRequest: (data, headers) => formData,
            onUploadProgress: async progressEvent => {
                await store.dispatch.media.setUploadPercentage({ assetId: asset.assetId, percentage: Math.floor(Number(progressEvent.progress) * 100) });
                console.log(Math.floor(Number(progressEvent.progress) * 100))
            }
        };

        const response = await axios.request(config);
        const newAsset = response.data.asset
        console.log('Upload complete', newAsset);
        return newAsset
    } catch (error) {
        console.error('Error during chunk upload:', { error });
    }
};