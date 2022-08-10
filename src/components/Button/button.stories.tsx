import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonSize, ButtonType } from './button';
import Button from './button';
// import mdx from './button.mdx';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'Button',
  component: Button,
  parameters: {
    docs: {
      // page: mdx
    }
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  btnType: ButtonType.Primary,
  children: 'Button'
};
export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  btnType: ButtonType.Default
};

export const Danger = Template.bind({});
Danger.args = {
  size: ButtonSize.Large,
  btnType: ButtonType.Danger,
  children: 'Button'
};

export const Link = Template.bind({});
Link.args = {
  size: ButtonSize.Small,
  btnType: ButtonType.Link,
  children: 'Button'
};
