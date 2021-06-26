import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserManagementList from "./user-list";


const UserRoutes = () => (

    <Switch>
        <Route path="/users" component={UserManagementList}>
        </Route>
    </Switch>

);

export default UserRoutes;




