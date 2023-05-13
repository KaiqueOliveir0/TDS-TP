import React from 'react';
import Header from './molecules/Header'
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/main.scss'
import {brown, lightGreen} from "@material-ui/core/colors";
import { createTheme } from '@material-ui/core/styles'

const m_Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: brown['800']
    },
    secondary: {
      // main: '#4a5b7e'
      main: lightGreen['800']
    },
  },
});

export function Layout(props) {
  return(
    <ThemeProvider theme={m_Theme}>
      <CssBaseline/>
      <Header 
        loginUrl={props.loginUrl}
        isAuthenticated={props.isAuthenticated}
        setAuthenticated={props.setAuthenticated}
      />
      <div className="header-padding" />
      {props.children}
      {/*<Footer />*/}
    </ThemeProvider>
  );
}
