import request from '@/http/index';

export const getCustomerService = (params: any) => {
    return request.post('/main/api/getBox/',params)
}