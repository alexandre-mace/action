import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import * as serviceWorker from './serviceWorker';
// Import your reducers and routes here
import event from './reducers/event/';
import eventRoutes from './routes/event';
import user from './reducers/user/';
import userRoutes from './routes/user';
import './app.scss';
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import OnBoardingPage from "./pages/OnBoardingPage";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    /* Add your reducers here */
    event,
    user
  }),
  applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        { userRoutes }
        { eventRoutes }
        <Route path="/compte" component={AccountPage}/>
        <Route path="/bienvenue" component={OnBoardingPage} />
        <Route path="/" component={HomePage}/>
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
