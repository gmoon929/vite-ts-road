// apiMock.ts
import Mock from 'mockjs';

import { menuData } from './data'


// 定义对象响应的数据类型
interface ObjectResponse {
    code: number;
    message: string;
    data: {
        token?: string | null;
    };
}
// 定义数组对象响应的数据类型
interface ObjectArrayResponse {
    code: number;
    message: string;
    data: []
}

// 模拟登录接口，路径为 /api/login，接收 POST 请求
Mock.mock('/api/login', 'post', (options: any): ObjectResponse => {
    const { body } = options;
    const { user, password } = JSON.parse(body);
    if (user === 'admin' && password === '123456') {
        return {
            code: 200,
            message: '登录成功',
            data: {
                token: 'your_token_here'
            }
        };
    } else {
        return {
            code: 400,
            message: '用户名或密码错误',
            data: {
                token: null
            }
        };
    }
});

// 模拟菜单获取接口，路径为 /api/getMenuData，接收 POST 请求
Mock.mock('/api/menuData', 'post', (options: any): ObjectArrayResponse => {
    const { body } = options;
    const { user } = JSON.parse(body);
    if (user === 'admin') {
        return {
            code: 200,
            message: 'success',
            data: menuData
            
        };
    } else if(user === 'test') {
        return {
            code: 200,
            message: 'success',
            data: [

            ]
        };
    }else{
        return {
            code: 200,
            message: 'success',
            data: [

            ]
        };
    }
});

export {};