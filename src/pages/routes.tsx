import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UserEdit from "./user/user-edit";
import UserList from "./user/user-list";


const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/user/:id/edit">
					<UserEdit/>
				</Route>
				<Route path="/users">
					<UserList/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
