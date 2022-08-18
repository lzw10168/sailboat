import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputSize } from './input';
import Input from './input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'Input',
  component: Input,
  decorators: [
    Input => (
      <div style={{ width: '330px' }}>
        <Input />
      </div>
    )
  ],
  parameters: {
    docs: {
      // page: mdx
    }
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const DefaultInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultInput.storyName = 'Default';
DefaultInput.args = {
  placeholder: 'please type something...'
};
export const IconInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
IconInput.storyName = '带图标';
IconInput.args = {
  icon: 'magnifying-glass',
  placeholder: 'please type something...'
};

export const ExtendsInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ExtendsInput.storyName = '前后置内容';
ExtendsInput.args = {
  icon: 'magnifying-glass',
  prepand: 'https://',
  append: '.com',
  placeholder: 'please type something...'
};
