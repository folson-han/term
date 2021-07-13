import axios from "axios";
import qs from "qs";
import { message } from "antd";

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:12443" : "https://www.chenhan.net.cn/project/api",
    timeout: 10000,
});

instance.interceptors.request.use(function(config){
    return config;
}, function(error){
    if(!window.navigator.onLine){
        message.error("请检查网络连接!").then();
    }
    return Promise.reject(error);
});

instance.interceptors.response.use(function(response){
    response.data = qs.stringify(response.data);
    return response.data;
}, function(error){
    if(!window.navigator.onLine){
        message.error("请检查网络连接!").then();
    }else{
        message.error("服务器有问题，请联系管理员!").then();
    }
    return Promise.reject(error);
});
