import { createContext, useState } from 'react';
import Alert, { AlertType } from './components/Alert/alert';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
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
  const [theme, setTheme] = useState(themes.light);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Menu mode="vertical">
        <MenuItem>背景</MenuItem>
        <MenuItem>图片</MenuItem>
        <MenuItem>上海</MenuItem>
      </Menu>
      <Menu mode="horizontal">
        <MenuItem>背景</MenuItem>
        <MenuItem>图片</MenuItem>
        <MenuItem>上海</MenuItem>
      </Menu>
      <Menu mode="horizontal">
        <SubMenu title="城市">
          <MenuItem>背景</MenuItem>
          <MenuItem>图片</MenuItem>
        </SubMenu>
        <MenuItem>上海</MenuItem>
      </Menu>
      <Menu mode="vertical">
        <SubMenu title="城市2" open>
          <MenuItem>背景</MenuItem>
          <MenuItem disabled>图片</MenuItem>
        </SubMenu>
        <MenuItem>上海</MenuItem>
      </Menu>
      <p>------------------------------------------------</p>
      {/* <Alert title="this is a alert" description="this is a alert" /> */}
      <button
        onClick={() => {
          setOpen(true);
        }}>
        打开
      </button>
      <Button
        onClick={() => {
          setOpen(false);
        }}>
        关闭
      </Button>
      <Alert
        type={AlertType.Default}
        title="this is a alert"
        description="this is a alert"
        open={open}
        onClose={onClose}
      />

      {/* <Alert title="this is a alert" description="this is a alert" /> */}
      {/* <Alert title="this is a alert" description="this is a alert" /> */}
    </div>
  );
}

export default App;
