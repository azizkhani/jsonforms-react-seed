import {createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import ReactDOM from 'react-dom';
import UserManagementList from "./user/UserManagement";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";

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
        <BrowserRouter>
            <Switch>
                <Route path="/users">
                    <UserManagementList/>
                </Route>
            </Switch>
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')
);
