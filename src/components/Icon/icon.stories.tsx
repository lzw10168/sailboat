import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './icon';
import { IconName } from '@fortawesome/fontawesome-svg-core';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Icon',
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = args => {
  return (
    <>
      <Icon {...args} />
    </>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const iconName: IconName = 'fa-xmark' as IconName;
Default.storyName = '默认';
Default.args = {
  icon: iconName
};
