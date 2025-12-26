import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import {App} from './App';

export default function Root() {
  const [dark, setDark] = useState(false);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <button onClick={() => setDark(v => !v)}>
        {dark ? 'Light-mode' : 'Dark-mode'}
      </button>
      <App />
    </ThemeProvider>
  );
}