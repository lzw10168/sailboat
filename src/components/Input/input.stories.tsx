import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';
export default {
  title: 'Input',
  id: 'Input',
  component: Input
  // decorators: [
  //   Input => (
  //     <div style={{ width: '350px' }}>
  //       <Input />
  //     </div>
  //   )
  // ]
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;
export const ADefault = Template.bind({});
ADefault.args = {
  placeholder: ' Input'
};
ADefault.storyName = '默认的 Input';
export const BDisabled = Template.bind({});
BDisabled.args = {
  placeholder: 'disabled input',
  disabled: true
};
BDisabled.storyName = '被禁用的 Input';

export const CIcon = Template.bind({});
CIcon.args = {
  placeholder: 'input with icon',
  icon: 'search'
};
CIcon.storyName = '带图标的 Input';

export const DSizeInput = () => (
  <>
    <Input style={{ margin: '10px 0' }} defaultValue="large size" size="lg" />
    <Input placeholder="small size" size="sm" />
  </>
);
DSizeInput.storyName = '大小不同的 Input';
export const EPandInput = () => (
  <>
    <Input
      style={{ margin: '10px 0' }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input defaultValue="google" append=".com" />
  </>
);

EPandInput.storyName = '带前后缀的 Input';
