import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from "react";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import App from "./pages/_app";
import initStore from './config/store';

/**
 * Customize form so each control has more space
 */
const theme = createMuiTheme({
	overrides: {
		MuiFormControl: {
			root: {
				margin: '0.8em 0',
			},
		},
	},
});

const store = initStore();


ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
