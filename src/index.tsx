import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import ReactDOM from 'react-dom';
import React from "react";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import App from "./pages/_app";

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

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline/>
		<App/>
	</ThemeProvider>,
	document.getElementById('root')
);
