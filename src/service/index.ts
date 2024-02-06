import { BASE_URL, BASE_URL1, TIME_OUT, TIME_OUT1 } from './config'
import ApiRequest from './request'

// 全局的请求
const apiRequest = new ApiRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 单独的请求
export const apiRequest1 = new ApiRequest({
  baseURL: BASE_URL1,
  timeout: TIME_OUT1,

  interceptors: {
    requestFulfilledFn: (config) => {
      console.log('单独的请求成功拦截')
      return config
    },
    requestRejectedFn: (err) => {
      console.log('单独的请求失败拦截', err)
    },
    responseFulfilledFn: (res) => {
      console.log('单独的响应成功拦截')
      return res
    },
    responseRejectedFn: (err) => {
      console.log('单独的响应失败拦截', err)
    }
  }
})

export default apiRequest
