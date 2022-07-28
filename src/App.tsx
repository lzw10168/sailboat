import { createContext, useState } from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
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
  return (
    <div className="App">
      <Button
        onClick={e => {
          console.log(e);
        }}
        size={ButtonSize.Large}
        btnType={ButtonType.Primary}>
        btn1-lg
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
        btn1-lg
      </Button>
      <Button btnType={ButtonType.Link}>btn2-sm</Button>
      <Button disabled btnType={ButtonType.Danger}>
        btn3
      </Button>
    </div>
  );
}

export default App;
