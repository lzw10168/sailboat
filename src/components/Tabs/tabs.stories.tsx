import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from './tabs';
import Tab from './tab';
import TabPanel from './tabPanel';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Tabs',
  component: Tabs,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Tabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tabs> = args => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} mode="vertical" {...args} onChange={handleChange}>
        <Tab label="Item One" />
        <Tab label="Item Two" disabled />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </>
  );
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.storyName = '默认';
Default.args = {
  type: 'border'
};
export const Card = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Card.storyName = '卡片类型';
Card.args = {
  type: 'card'
};
