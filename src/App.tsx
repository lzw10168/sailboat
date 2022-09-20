import React, { createContext, useState } from 'react';
import axios from 'axios';
// import Alert, { AlertType } from './components/Alert/alert';
// import Button, { ButtonType, ButtonSize } from './components/Button/button';
// import Menu from './components/Menu/menu';
// import MenuItem from './components/Menu/menuItem';
// import SubMenu from './components/Menu/subMenu';
// import Tabs from './components/Tabs/tabs';
// import Tab from './components/Tabs/tab';
// import TabPanel from './components/Tabs/tabPanel';
// import Icon from './components/Icon/icon';
// import Input from './components/Input/input';
import Upload from './components/Upload';
interface ThemeProps {
  [key: string]: { color: string; backgroundColor: string };
}
const themes: ThemeProps = {
  light: {
    color: '#000000',
    backgroundColor: '#eeeeee'
  },
  dark: {
    color: '#ffffff',
    backgroundColor: '#222222'
  }
};
function App() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // https://jsonplaceholder.typicode.com/posts
    const files = e.target.files;
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios
        .post('https://jsonplaceholder.typicode.com/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(resp => {
          console.log(resp);
        });
    }
  };
  return (
    <div className="App">
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        name="fileName"
        data={{ key: 'fileName' }}
        headers={{ 'X-Powered-By': 'sailboat' }}
        multiple
        dragger
        theme="success"
      />
    </div>
  );
}

export default App;
