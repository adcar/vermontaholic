import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Towns from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from "@material-ui/core/colors/green";
import {CssBaseline} from "@material-ui/core";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: green[500],
    },
  },
}));

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
    <Towns />
    </ThemeProvider>
    </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
