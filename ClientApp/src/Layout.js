import React from 'react';
import Header from './molecules/Header'
import Footer from './molecules/Footer'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/main.scss'
import {brown, lightGreen} from "@material-ui/core/colors";

const m_Theme = createMuiTheme({
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
