import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers/weather";
import { promiseMiddleware } from '../middlewares';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import config from '../config/dev';
import reducer from '../reducers';

// const store = createStore(rootReducer);

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (config.isDevelopment) {
    // Enable additional logging in non-production environments.
    return applyMiddleware(myRouterMiddleware, promiseMiddleware , /*createLogger()*/)
  } else {
    return applyMiddleware(myRouterMiddleware, promiseMiddleware);
  }
};

export const store = createStore(
  reducer(history), composeWithDevTools(getMiddleware())
);


// export default store;
