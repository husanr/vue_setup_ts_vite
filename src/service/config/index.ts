// export const BASE_URL = 'http://api1'
export const TIME_OUT = 10000

export const BASE_URL1 = 'http://api2'
export const TIME_OUT1 = 60000

// 区分环境方式
// 方式 1. import.meta.env.MODE 或者 import.meta.env.DEV & import.meta.env.PPOD
let BASE_URL = ''
// if (import.meta.env.MODE === 'production') {
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'api1'
} else {
  // 开发环境
  BASE_URL = 'api2'
}
// 方式 2. 添加 .env.*文件
console.log(import.meta.env.VITE_BASE_NAME)
console.log(import.meta.env.VITE_BASE_URL)
BASE_URL = import.meta.env.VITE_BASE_URL

export { BASE_URL }
