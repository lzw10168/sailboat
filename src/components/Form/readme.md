

## 需求分析
  1. 分析需求，明确组件应该有的结构。
  2. 完成组件基本的静态展示。
  3. 提取一个对应的store作为整个组件的中枢以及父子组件的桥梁。
  4. 注册tem到store.
  5. Item表单更新的时候更新store中的数据。
  6. 自定义Item的字段以及完善默认值。
  7. 添加单个tem的验证。
  8. 添加表单整体的验证。
  9. 添加组件实例方法。
  10. 编写单元测试
  11. stories编写

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


### 验证功能
#### 场景
  * 每个Item的验证
  * 整个Form的验证
#### 流程
  * 每个Item的验证
    * 1.用户输入
    * 2.用户离开input(onBlur)
    * 3.验证
    * 4.验证结果
  * 整个Form的验证
    * 1.用户点击提交
    * 2.验证
    * 3.验证结果
#### 第三方库
  [链接](https://github.com/yiminghe/async-validator)
  ```js
  import Schema from 'async-validator';
  const descriptor = {
    name: {
      // 非常多的type
      // https://github.com/yiminghe/async-validator#type
      type: 'string',
      required: true,
      validator: (rule, value) => value === 'muji',
    },
    age: {
      type: 'number',
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value < 18) {
            reject('too young');  // reject with error message
          } else {
            resolve();
          }
        });
      },
    },
  };
  const validator = new Schema(descriptor);
  // 俩种验证方式, 第一种是回调
  validator.validate({ name: 'muji' }, (errors, fields) => {
    if (errors) {
      // validation failed, errors is an array of all errors
      // fields is an object keyed by field name with an array of
      // errors per field
      return handleErrors(errors, fields);
    }
    // validation passed
  });

  // PROMISE USAGE
  validator.validate({ name: 'muji', age: 16 }).then(() => {
    // validation passed or without error message
  }).catch(({ errors, fields }) => {
    return handleErrors(errors, fields);
  });
  ```


#### 自定义Rule的规则

```typescript
  (getValue) => {
    const otherValue = getValue('pwd')
    return {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value !== otherValue) {
            reject('两次密码不一致');  // reject with error message
          } else {
            resolve();
          }
        });
      },
    }
  }

  type CustomRuleFunc = ({getFieldValue}) => RuleItem;

```

### 总结
  1. 分析需求, 明确组件应该有的结构
  2. 完成组件基本的静态展示
  3. 提取一个对应的store作为整个组件的中枢以及父子组件的桥梁
  4. 注册item到store
  5. Item表单更新的时候更新store中的数据
  6. 自定义Item的字段以及完善默认值
  7. 添加单个Item的验证
  8. 添加表单整体的验证
  9. 添加组件实例方法
