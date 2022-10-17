import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome', module).add(
  'welcome',
  () => (
    <>
      <h1>欢迎来到sailboat组件库</h1>
      <p>这是一个基于React的组件库</p>
      <h3>安装试试</h3>
      <code>npm install sailboat-design --save</code>
    </>
  ),
  { info: { disable: true } }
);
