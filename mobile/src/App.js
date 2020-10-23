import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Routes from '~/routes';
import useStatusBar from '~/utils/useStatusBar';

export default function App() {
  useStatusBar('light-content');
  const theme = useSelector((state) => state.theme.theme);
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
