import request from '@/http/index';

export const getCustomerService = (params: FormData) => {
    return request.post('/main/api/getBox/',params)
}