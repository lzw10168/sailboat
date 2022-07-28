import { createContext, useState } from 'react';
import Hello from './components/Hello';
import Transition from './components/Transition';
interface ThemeProps {
  [key: string]: { color: string; backgroundColor: string };
}
const themes: ThemeProps = {
  light: {
    color: '#000000',
    backgroundColor: '#eeeeee',
  },
  dark: {
    color: '#ffffff',
    backgroundColor: '#222222',
  }
}
export const ThemeContext = createContext(themes.light);
function App() {
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <Hello msg="Hello World" />
        <Transition />
        <button onClick={() => setTheme(themes.dark)}>Switch to dark theme</button>
        <button onClick={() => setTheme(themes.light)}>Switch to light theme</button>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
