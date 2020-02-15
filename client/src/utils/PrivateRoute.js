import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authentication } from './authentication/authentication';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    const currentUser = authentication.currentUserValue;
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/se-connecter', state: { from: props.location } }} />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
)
