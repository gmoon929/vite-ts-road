import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import lazyLoad from "./utils/lazyLoad";
import { RouteObject } from "./interface";

const metaRouters = import.meta.glob('./modules/*.tsx', {eager: true})
export const routerArray: RouteObject[] = []
Object.keys(metaRouters).forEach((item: string)=>{
    Object.keys(metaRouters[item] as any).forEach(ch=>{
        routerArray.push(...(metaRouters[item] as any)[ch])
    })
})
export const rootRouter = [
    {
        path: '/',
        element : <Navigate to="login" />
    },
    {
        path: '/login',
        element : lazyLoad(React.lazy(()=>import('@/views/login'))),
        meta: {
            requireAuth: false,
            title: '登录',
            key: 'login'
        }
    },
    ...routerArray
]

const Router = () => {
    const routes = useRoutes(rootRouter)
    return routes
}
export default Router