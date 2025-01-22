import request from '@/http/index';

export const getLeftCPU = (params: FormData) => {
    return request.post('/main/api/getBox/',params)
}