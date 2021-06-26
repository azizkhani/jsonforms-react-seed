import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserEdit from "./user/user-edit";
import UserList from "./user/user-list";


const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/users/:id/edit" component={UserEdit} />
				<Route path="/users" component={UserList} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
