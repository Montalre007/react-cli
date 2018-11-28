import axios from 'axios';
import Router from '../router'
import {message} from "antd/lib/index";

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
axios.interceptors.response.use(
    response => {
        if (1008 === response.data.code) {
            Router.history.push('/login');
            return Promise.reject('用户未登录');
        }
        return response
    },
    error => {
        message.error("请求失败");
        return Promise.reject(error.response.data);
    }
)
export function get(url, params={}) {
    params.date = new Date();
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params})
            .then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function post(url, data={}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}