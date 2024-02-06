# 项目搭建步骤

## 1. 使用vue最新的脚手架创建
```shell
// node16 以上
npm init vue@latest 
```
选ts、eslint、prettier

## 2. 配置eslint和prettier
- 新建.editorconfig文件
```md
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```
- 新建.prettierrc.json文件
```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,//结尾分号
  "tabWidth": 2,//tab的宽度
  "singleQuote": true,//是否单引号
  "printWidth": 100,//每行的宽度
  "trailingComma": "none"//多行结尾是否加逗号
}
```
- eslint和prettier联动
```shell
npm install eslint-plugin-prettier -D
```
在.eslintrc.cjs中添加 'plugin:prettier/recommended'
```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
```

## 3. 配置husky和commitlint提交git拦截器

- 1. git init
  初始化git
- 2. npx husky-init && npm install
  安装husky并生成.husky文件夹
- 3. npm i @commitlint/config-conventional @commitlint/cli -D
  安装commitlint
- 4. 创建commitlint.config.js
```js
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
```
- 5. npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
  添加commit-msg文件, 删除 pre-commit中的 npm test

## 4. 配置路由 vue-router
- 安装vue-router依赖
```shell
npm install vue-router
```
- 配置路由
```js
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', //默认重定向到main页面
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)', // 路由没有匹配到 去notfound页面
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})
export default router
```
- 在main.ts中引入
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import '@/assets/css/index.less'

const app = createApp(App)
app.use(router)
app.mount('#app')
```
- 在App.vue中测试跳转
```vue
<template>
  <div>
    <h3>app</h3>
    <router-link to="/login">去登录</router-link>
    <router-link to="/main">去主页</router-link>
    <router-view></router-view>
  </div>
</template>
```

## 5. 配置store 使用pinia
- 安装pinia
```shell
npm install pinia
```
- 配置store/index.ts
```ts
import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia
```
- 在main.ts中引入
```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

import 'normalize.css'
import '@/assets/css/index.less'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
```
- 创建一个store/counter.ts使用pinia
```ts
import { defineStore } from 'pinia'
const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeCounter(newCounter: number) {
      this.counter = newCounter
    }
  }
})
export default useCounterStore
```
- 在Main.vue页面使用counter
```vue
<template>
  <div class="main">
    <h4>{{ counterStore.counter }} --- {{ counterStore.doubleCounter }}</h4>
    <button @click="changeCounter">改变counter</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()
function changeCounter() {
  // 触发actions
  counterStore.changeCounter(999)
}
</script>
```

## 6. 配置axios
- 见service

## 7. 配置环境 dev prod
- vite环境，有两种配置方式
- 方式一: 使用import.meta.env.MODE: development/production 或者 import.meta.env.DEV/PROD
```js
let BASE_URL = ''
// if (import.meta.env.MODE === 'production') {
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'api1'
} else {
  // 开发环境
  BASE_URL = 'api2'
}
```
- 方式二: 创建 .env* 文件，使用import.meta.env.[变量名]
```shell
# .env
# 所有环境通用 必须以VITE开头
VITE_BASE_NAME='code name'
```
```shell
# .env.production
# 生产环境
VITE_BASE_URL='api1'
```
```shell
# .env.development
# 开发环境
VITE_BASE_URL='api2'
```

- 使用
```js
let BASE_URL = ''
console.log(import.meta.env.VITE_BASE_NAME)
console.log(import.meta.env.VITE_BASE_URL)
BASE_URL = import.meta.env.VITE_BASE_URL
```
