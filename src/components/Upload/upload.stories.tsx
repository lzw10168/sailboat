import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload } from './upload';

const checkFileSize = (file: File) => {
  // 50kb
  if (Math.round(file.size / 1024) > 50) {
    alert('File size exceeds 50kb limit.');
    return false;
  } else {
    return true;
  }
};
export default {
  title: 'Upload',
  component: Upload,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = args => <Upload {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  action: 'https://jsonplaceholder.typicode.com/posts',
  onChange: action('changed'),
  beforeUpload: checkFileSize,
  onProgress: action('progress')
};
