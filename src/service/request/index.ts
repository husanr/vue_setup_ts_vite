import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * 三种拦截：
 *  1. 全局拦截器
 *  2. 实例拦截器
 *  3. 单个接口拦截器
 *
 * 响应类型使用泛型 传入响应结果的类型
 */

interface NewRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: {
    requestFulfilledFn?: (config: any) => any
    requestRejectedFn?: (err: any) => any
    responseFulfilledFn?: (res: T) => T
    responseRejectedFn?: (err: any) => any
  }
}

class ApiRequest {
  instance: AxiosInstance
  constructor(config: NewRequestConfig) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截', err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功的拦截')
        return res.data
      },
      (err) => {
        console.log('全局响应失败的拦截', err)
      }
    )

    // 单独添加的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestFulfilledFn,
      config.interceptors?.requestRejectedFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseFulfilledFn,
      config.interceptors?.responseRejectedFn
    )
  }

  // 泛型 处理返回值的类型，使用传入的类型当返回值类型，默认为any
  request<T = any>(config: NewRequestConfig<T>) {
    // 第三种拦截器：单独接口的拦截
    if (config.interceptors?.requestFulfilledFn) {
      config = config.interceptors.requestFulfilledFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单独接口处理
          if (config.interceptors?.responseFulfilledFn) {
            res = config.interceptors.responseFulfilledFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 可选 get/post等方法
  get<T = any>(config: NewRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: NewRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
}

export default ApiRequest
