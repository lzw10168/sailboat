import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Form } from './form';
import Input from '../Input/input';
import Button from '../Button/button';
import Icon from '../Icon/icon';

export default {
  title: 'Form',
  id: 'Form',
  component: Form,
  subcomponents: { Item: Form.Item },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    )
  ]
} as ComponentMeta<typeof Form>;

export const BasicForm = (args: any) => (
  <Form
    initialValues={{
      user: '22222'
    }}
    {...args}>
    <Form.Item name="user" label="用户名">
      <Input type="text" />
    </Form.Item>
    <Form.Item name="password" label="密码">
      <Input type="password" />
    </Form.Item>
    <Form.Item name="test">
      <Input type="password" />
    </Form.Item>
  </Form>
);
BasicForm.storyName = 'Form 组件';
