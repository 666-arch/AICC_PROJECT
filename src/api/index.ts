import request from '@/http/index';

//获取boxId
export const getBoxId = (params: FormData) => {
    return request.post('/main/api/getBoxList/',params)
}

export const getConfigData = (params: FormData) => {
    return request.post('/main/api/getBox/',params)
}