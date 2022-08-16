import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './alert';
import Button from '../Button/button';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Alert',
  component: Alert,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Alert>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Alert> = args => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <Button onClick={handleClick}>{show ? 'Hide' : 'Show'}</Button>
      <Alert {...args} open={show} onClose={handleClick} />
    </>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = '默认';
Default.args = {
  title: '我是一个提示'
};

export const Custom = Template.bind({});
Custom.storyName = '自定义';
Custom.args = {
  title: <span style={{ color: '#ff4785' }}>我是自定义的title</span>,
  description: <p style={{ color: '#ff4785' }}>我是自定义的description</p>
};
