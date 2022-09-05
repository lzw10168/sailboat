
# sailboat
> it's just a simple component library

> dependencies version
  * [node] 16+
### 考虑的问题

- 代码结构
- 格式化 - 代码校验
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD 文档生成...



### 项目结构

```JSX
sailboat
  README.md
  node_modules/
  package.json
  tsconfig.json
  src/
      components/
        Button/
          button.tsx
          button.test.tsx
          style.scss
      styles/
        ...
      index.tsx

```



### 格式化, 校验eslint + prettierrc
  - eslint , prettierrc

### 样式解决方案

> 全局变量, 依赖, 可重用性, 

- Inline css

    
- CSS in JS

    

    
- Sass/Less (选择用)

```JSX
style/
  _variables.scss (各种变量以及可配置设置)
  _reboot.scss (样式初始化 normalize.css)
  _mixins.scss (全局mixins)
  _function.scss (全局 functions)
  index.scss (入口)
components/
  Button/
    style.scss(组件单独样式)

```

### 色彩体系

- 系统色板 - 基础色板  + 中性色板
- 产品色板 - 品牌色  + 功能色板

### 样式变量分类

- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

### normalize.css

  
