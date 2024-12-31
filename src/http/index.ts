import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios'
import { ResultData } from './interface'
const axiosConfig = {
    baseURL: '/api',
    timeout: 4000,
    headers: {
        "Content-Type": "application/json",
    },
}
class HttpRequest {
    service: AxiosInstance
    constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config)
        this.service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            return config
        })
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data } = response
                return data
            },
            (error: AxiosError) => {
                const { response } = error
                console.log('error', error)
                if (response) {
                    // defaultStatus(response.status)
                }
                return Promise.reject(error)
            }
        )
    }
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, { params, ..._object })
    }
    post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.post(url, params, _object)
    }
    // put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    //     return this.service.put(url, params, _object)
    // }
    // delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    //     return this.service.delete(url, { params, ..._object })
    // }
}

export default new HttpRequest(axiosConfig)
