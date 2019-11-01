import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
});

// 添加请求头
http.interceptors.request.use(function(config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message.error(err.response.data.message); // err.response错误对象里的返回对象 axios规定的
        if (err.response.status === 401) {
            router.push('/login');
        }
    }
    return Promise.reject(err);
});

export default http;