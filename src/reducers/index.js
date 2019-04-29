// const initialState = {
//     articles: []
//   };
//   function rootReducer(state = initialState, action) {
//     return state;
//   };
//   export default rootReducer;

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import weather from './weather';

export default (history) => combineReducers({
	weather,
	router: connectRouter(history)
})
