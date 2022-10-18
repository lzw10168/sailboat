export { default as Button } from './components/Button';
export { default as Alert } from './components/Alert';
export { default as Transition } from './components/Transition';
export { default as Form } from './components/Form';
export { default as Icon } from './components/Icon';
export { default as Input } from './components/Input';
export { default as Menu } from './components/Menu';
export { default as Tabs } from './components/Tabs';
export { default as Upload } from './components/Upload';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './styles/index.scss';
import React from 'react';
library.add(fas);
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { createRoot } from 'react-dom/client';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
// library.add(fas);
// library.add(fab);
// library.add(far);

// import './styles/index.scss';
// const root = createRoot(document.getElementById('root') as HTMLElement);

// // const root = ReactDOM.createRoot(
// //   document.getElementById('root') as HTMLElement
// // );
// root.render(
//   // <React.StrictMode>
//   <App />
//   // </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
