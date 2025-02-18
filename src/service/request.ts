import axios from 'axios'
import { message } from 'antd';

const request = axios.create({
    // 基础路径,发请求时，路径会出现api
    baseURL:'/',
    // 代表请求时间
    timeout:5000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
      // 在发送请求之前做些什么，比如添加请求头
      const token = localStorage.getItem('token'); // 假设从本地存储获取 token，根据实际情况调整
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
      // 对响应数据做点什么，比如直接返回 data 部分（如果 API 响应格式固定）
      if(response.data.code == 200){
        return response.data;
      }else{
        message.error({
          content: response.data.message,
        });
        throw response.data.message
      }
  },
  (error) => {
      // 对响应错误做点什么，统一处理错误情况
      if (error.response) {
          // 服务器响应了但状态码表示错误
          console.error('请求错误，状态码：', error.response.status);
          console.error('错误信息：', error.response.data);
      } else if (error.request) {
          // 请求发出了但没有收到响应
          console.error('未收到响应');
      } else {
          // 其他错误情况，比如设置请求时出错
          console.error('请求设置错误：', error.message);
      }
      return Promise.reject(error);
  }
);

// 暴露
export default {
  get: <T = any>(option: any) => {
    return request({ method: 'get', ...option }) as unknown as T
  },
  post: <T = any>(option: any) => {
    return request({ method: 'post', ...option }) as unknown as T
  },
  delete: <T = any>(option: any) => {
    return request({ method: 'delete', ...option }) as unknown as T
  },
  put: <T = any>(option: any) => {
    return request({ method: 'put', ...option }) as unknown as T
  }
}