import axios, { AxiosResponse, AxiosError } from 'axios';
import { store } from 'store';
import { getFromStorage } from 'service/storage';

export const APIService = null


const MAX_REQUESTS_COUNT = 10
const INTERVAL_MS = 10
let PENDING_REQUESTS = 0


type BaseUrl = string;
const baseURL: string =
    // 'https://c531-46-116-226-197.ngrok-free.app'
    // 'http://10.100.102.102:8001'
    'http://10.100.102.104:8001'
// 'http:///192.168.1.149:8001'

const axiosPrivate = axios.create({
    baseURL
})

export const createInterceptors = () => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
        async config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${await getFromStorage('access_token')}`
            }
            return config
            // return new Promise((resolve, reject) => {
            //     let interval = setInterval(() => {
            //         if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
            //             PENDING_REQUESTS++
            //             clearInterval(interval)
            //             resolve(config)
            //         }
            //     }, INTERVAL_MS)
            // })
        }, async error => Promise.reject(error)

    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
        response => {
            // PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
            // return Promise.resolve(response)
            return response
        },
        async error => {
            // PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
            const prevRequest = error?.config;
            const isRefreshTokenRequest = error.response.config.url === '/auth/token'
            if (error?.response?.status === 403 && !prevRequest?.sent && !isRefreshTokenRequest) {
                console.log({ isRefreshTokenRequest, url: error.response.config.url })
                prevRequest.sent = true;
                const newAccessToken = await store.dispatch.auth.refreshAccessToken();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error)
        }
    )

    const ejectInterceptors = () => {
        axiosPrivate.interceptors.request.eject(requestInterceptor)
        axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
    return [ejectInterceptors, requestInterceptor, responseInterceptor]
}

export default axiosPrivate;

// export const get = (route: string) =>
//     axios.get(`${baseUrl}/${route}`)
//         .then((response: AxiosResponse) => response.data)
//         .catch((err: AxiosError) => {
//             // global error handling
//             throw err
//         })

// export const post = (route: string, payload: any) =>
//     axios.post(`${baseUrl}/${route}`, payload)
//         .then((response: AxiosResponse) => {
//             if (response.data.error) {
//                 throw new Error(response.data.error)
//             }
//             return response.data
//         })
//         .catch((err: AxiosError) => {
//             // global error handling
//             throw err
//         })