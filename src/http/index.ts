import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios'
import { ResultData } from './interface'
const axiosConfig = {
    // baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://192.168.1.10',
    baseURL: '/api',
    timeout: 50000,
    headers: {
        "Content-Type": "multipart/form-data",
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
                if (response) {
                }
                return Promise.reject(error)
            }
        )
    }
    get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
        return this.service.get(url, { params, ..._object })
    }
    post<T>(url: string, params?: FormData, _object = {}): Promise<ResultData<T>> {
        return this.service.post(url, params, _object)
    }
}

export default new HttpRequest(axiosConfig)
