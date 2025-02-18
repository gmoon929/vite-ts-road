import request from '@/service/request'

export const queryMenuData = (params: any): Promise<any> => {
    return request.post({ url: `/api/menuData`, data: params })
}