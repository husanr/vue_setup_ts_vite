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
