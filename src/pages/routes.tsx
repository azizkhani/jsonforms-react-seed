import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserEdit from './user/user-edit';
import UserList from './user/user-list';
import userListQuery from './user/user-list-query';
import UserEditReactForm from './user/user-edit-form';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/users/:id/new-edit' component={UserEditReactForm} />
        <Route path='/users/:id/edit' component={UserEdit} />
        <Route path='/users/create' component={UserEdit} />
        <Route path='/users/new-create' component={UserEditReactForm} />
        <Route path='/users' component={UserList} />
        <Route path='/new-users' component={userListQuery} />
        <Route path='/' component={UserList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
