import * as mime from 'mime';
import axios from 'service/api';

import { Platform } from 'react-native';
import { decode } from 'base-64';
import { AxiosRequestConfig } from 'axios';
import { store } from 'store';

const CHUNK_SIZE = 1024 * 1024; // 1MB

function dataURLtoFile(dataUrl: string, filename: string, mime: string) {
  var arr = dataUrl.split(','),
    bstr = decode(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const uploadAsset = async (asset: IAsset) => {
  try {
    const filePath = Platform.OS === 'web' ? asset.uri : asset.base64 as string
    const mimeType = mime.getType(asset.fileExtension) as string;
    const file = dataURLtoFile(filePath, `image.${asset.fileExtension}`, mimeType)
    const fileSize = file.size
    const chunkSize = CHUNK_SIZE;
    const chunks = []
    const chunkCount = Math.ceil(fileSize / chunkSize)
    let chunkIndex = 0

    const requests = []

    while (chunkIndex < chunkCount) {
      const offset = chunkSize * chunkIndex
      const chunkEnd = offset + chunkSize;
      const contentRange = "bytes " + offset + "-" + chunkEnd + "/" + fileSize;
      const chunk = file.slice(offset, chunkEnd)

      chunks.push(chunk)

      const formData = new FormData();
      formData.append('assetId', asset.assetId);
      formData.append('chunk', chunk);
      formData.append('mimeType', mimeType);
      formData.append('fileExtension', asset.fileExtension);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('offset', offset.toString());
      formData.append('totalSize', fileSize.toString());
      formData.append('chunkCount', chunkCount.toString());


      const config: AxiosRequestConfig<FormData> = {
        method: 'post',
        url: '/image/c',
        responseType: "json",
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Range': contentRange,
          // 'Content-Length': chunk.size.toString(),
          'X-Content-Id': asset.assetId,
        },
        data: formData,
        transformRequest: formData => formData,
        onUploadProgress: async (progressEvent) => {
          await store.dispatch.media.setUploadPercentage({
            assetId: asset.assetId,
            percentage: Math.floor(Number(progressEvent.progress) * 100),
          });
        },
      };

      requests.push(axios.request(config));
      chunkIndex++
    }

    const res = await Promise.all(requests)
    const newAsset: IAsset = res.find(result => result.data.asset)?.data?.asset
    console.log('Upload complete', newAsset);
    return newAsset
  } catch (error) {
    console.error('Error during chunk upload:', { error });
  }
};