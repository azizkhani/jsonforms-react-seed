import React from 'react';
import {Switch, Route} from 'react-router-dom';
import UserManagementList from "./UserManagement";


const UserRoutes = () => (

    <Switch>
        <Route path="/users">
            <UserManagementList/>
        </Route>
    </Switch>

);

export default UserRoutes;




