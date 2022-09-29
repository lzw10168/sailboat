import React, { useRef } from 'react';
import { ComponentMeta } from '@storybook/react';
import Form from './form';
import Input from '../Input/input';
import Button from '../Button/button';
import Icon from '../Icon/icon';
import { type } from 'os';
import { CustomRule } from './useStore';

export default {
  title: 'Form',
  id: 'Form',
  component: Form,
  subcomponents: { Item: Form.Item }
  // decorators: [
  //   Story => (
  //     <div style={{ width: '500px' }}>
  //       <Story />
  //     </div>
  //   )
  // ]
} as ComponentMeta<typeof Form>;

export const BasicForm = (args: any) => {
  const ref = useRef<HTMLElement>();

  const confirmRules: CustomRule[] = [
    {
      required: true
    },
    ({ getFieldValue }) => ({
      asyncValidator(rule, value) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (getFieldValue('password') === value) {
              resolve();
            } else {
              reject('两次密码不一致');
            }
          }, 2000);
        });
      }
    })
  ];
  return (
    <div style={{ width: '500px' }}>
      <Form
        initialValues={{
          user: '22222'
        }}
        {...args}
        ref={ref}>
        {({ isSubmitting, isValid }) => (
          <>
            <Form.Item
              name="user"
              label="用户名"
              rules={[
                {
                  required: true,
                  type: 'email'
                }
              ]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true
                }
              ]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item name="confirmPwd" label="重复密码" rules={confirmRules}>
              <Input type="password" />
            </Form.Item>
            <div className="sailboat-form-submit-area">
              <Button type="submit" btnType="primary">
                {isSubmitting ? '提交中' : '提交'}
                --
                {isValid ? '验证通过' : '验证失败'}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
BasicForm.storyName = 'Form 组件';
