import axios from 'axios';

export const http = axios.create({
    baseURL: env.VITE_API_URL,
    timeout: 10000,
});

/* 请求拦截 */
http.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

/* 响应拦截 */
http.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res && res.status !== 200) {
            throw new Error(res.message);
        }
        return res.data;
    },
    (error) => {
        const { response } = error;
        if (!response || !response.status || !response.data) {
            msg.error('Network Error');
            return Promise.reject(new Error('Network Error'));
        }
        const { status, message } = response.data;

        let errMsg = error.message;
        switch (status) {
            // 请求失败
            case 400:
                errMsg = message;
                break;
            // 请求地址错误
            case 404:
                errMsg = 'Request url does not exist';
                break;
            // 过多请求
            case 429:
                errMsg = 'Too many requests, please wait, refresh and try again';
                break;
            // 其它错误
            default:
                errMsg = message ?? 'There is a problem with the server, please try again later!';
                break;
        }

        msg.error(errMsg);
        return Promise.reject(new Error(errMsg));
    }
);
