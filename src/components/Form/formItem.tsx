import classNames from 'classnames';
import React, { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { FormContext } from './form';
import { ADD_FIELD, UPDATE_VALUE } from './useStore';

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;
export interface FormItemProps {
  name: string;
  children?: ReactNode;
  label?: string;
  // value的属性名称
  valuePropName?: string;
  // 监听事件名称
  trigger?: string;
  // 获取值的方法
  getValueFromEvent?: (e: any) => any;
}
// 检查子组件function
function checkChild(childList: any[]) {
  if (childList.length === 0) {
    console.error(
      'NO child element found in Form.Item, please add a child element'
    );
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn(
      'Only support one child element in Form.Item, others will be ignored'
    );
  }
  // 不是ReactElement
  if (!React.isValidElement(childList[0])) {
    console.error('Child element must be a ReactElement');
  }
}

export function FormItem(props: FormItemProps) {
  const { children, label, name, valuePropName, trigger, getValueFromEvent } =
    props as SomeRequired<
      FormItemProps,
      'valuePropName' | 'getValueFromEvent' | 'trigger'
    >;
  // 没有label的时候给特定的class
  const rowClass = classNames('sailboat-row', {
    'sailboat-row-no-label': !label
  });
  const { dispatch, fields, initialValues } = useContext(FormContext);

  // 初始化注册一次
  useEffect(() => {
    // 默认值
    const value = initialValues ? initialValues[name] : '';
    dispatch({
      type: ADD_FIELD,
      name: name,
      value: { label, name, value }
    });
  }, []);
  // 获取store中的value
  const filedState = fields[name];
  const value = filedState && filedState.value;
  const onValueUpdate = (e: any) => {
    // 怎么样从事件对象e里面获取到value
    const value = getValueFromEvent(e);
    dispatch({
      type: UPDATE_VALUE,
      name: name,
      value: value
    });
  };
  // 1 手动创建一个属性列表, 需要有value , 以及onChange
  const controlProps: Record<string, any> = {};
  // value的属性名称
  controlProps[valuePropName!] = value;
  // 回调属性名称
  controlProps[trigger!] = onValueUpdate;
  // todo 适应不同的事件以及value属性名称
  // 2 获取children中的第一个元素,
  const childList = React.Children.toArray(children);

  // todo 判断children的类型, 给出警告
  checkChild(childList);
  const child = childList[0] as React.ReactElement;
  // 3 并且cloneElement, 传入属性列表
  const childWithProps = React.cloneElement(child, {
    ...child.props,
    ...controlProps
  });
  return (
    <div className={rowClass}>
      {label && (
        <label title={label} className={'sailboat-form-item-label'}>
          {label}
        </label>
      )}
      <div className="sailboat-form-item">{childWithProps}</div>
    </div>
  );
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  getValueFromEvent: (e: any) => e.target.value
};

export default FormItem;
