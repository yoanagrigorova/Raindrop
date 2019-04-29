import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/layout/main';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store, history } from './store';
import { ConnectedRouter } from 'connected-react-router';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <Main />
    </ConnectedRouter>
  </Provider>
),
  document.getElementById('root')
)

// serviceWorker();
