import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import axios from 'axios';

// Registers and enables scss language support
SyntaxHighlighter.registerLanguage('scss', scss);
library.add(fas);

import '../src/styles/index.scss';
export const parameters = {
  // 监听事件 on开头的驼峰
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      // 颜色组件处理
      color: /(background|color)$/i,
      // date组件处理
      date: /Date$/
    }
  },
  features: {
    previewMdx2: true // 👈 MDX 2 enabled here
  }
};
