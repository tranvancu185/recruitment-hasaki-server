import axios, { CancelToken } from 'axios';
import { ENV_BASE_URL } from './server.config'

const instance = axios.create({
    baseURL: ENV_BASE_URL,
    timeout: 50000,
    //transformRequest: [(data) => JSON.stringify(data)],
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    validateStatus: (status) => {
      return true; // I'm always returning true, you may want to do it depending on the status received
    },
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // AUTH JWT

    // const token = Cookies.get('ws_token')
    // if(token){
    //   config.headers.common['Authorization'] = `Bearer ${token}`;
    // }
    // return config;
    return;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});