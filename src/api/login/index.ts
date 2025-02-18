import request from '@/service/request'

export const login = (params: any): Promise<any> => {
    return request.post({ url: `/api/login`, data: params })
}