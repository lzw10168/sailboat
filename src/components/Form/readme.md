
### 交互要解决的问题
  * 每个Item中input的值应该存在哪里？
  * 每个Item验证怎样触发？
  * 整个Form验证怎样触发？
#### 方案一
  * value存在每个Item组件当中，受控组件，useState
  * 每个Item内部有个validateInput函数，在特殊的时机（比如blur)进行验证，修改状态，显示提示。
  * 整个Form在onSubmit的时候，需要拿到所有Item实例上validateInput函数，一一调用，得出结论
    * 比较有难度，因为在Form中是使用children的方式渲染，没发给单独的给Item使用ref赋值
#### 方案二
  * 设置一个store,存放所有和表单相关的值以及一系列的方法，可以被两者都访问到 form store应该有的数据结构以及方法设计
  ```js
  store 结构
  {
    fields: {
      name: {
        value: '',
        validate: () => {},
        validateStatus: '',
        help: '',
        rules: []
      },
      age: {
        value: '',
        validate: () => {},
        validateStatus: '',
        help: '',
        rules: []
      }
    },
  }

  methods的一些方法
  {
    validate: () => {},
    validateField: (key) => {},
    getFieldsValue: () => {},
    getFieldValue: (key) => {},
    setFieldsValue: ({}) => {},
    setFieldValue: (key) => {},
    resetFields: () => {},
    resetField: (key) => {},
  }
  ```
