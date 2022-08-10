import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ButtonSize, ButtonType } from './menu';
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Menu',
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <MenuItem> item1</MenuItem>
    <MenuItem> item2</MenuItem>
    <MenuItem disabled> item3-disabled</MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem> sub-item1</MenuItem>
      <MenuItem> sub-item2</MenuItem>
      <MenuItem disabled> sub-item3-disabled</MenuItem>
    </SubMenu>
  </Menu>
);

export const Horizontal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Horizontal.storyName = '默认menu';

export const Vertical = Template.bind({});
Vertical.storyName = '纵向menu';
Vertical.args = {
  mode: 'vertical'
};
