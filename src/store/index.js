import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import ReduxThunk from 'redux-thunk';
import coursesReducer from './courses/reducer';
import usersReducer from './users/reducer';
import authorsReducer from './authors/reducer';

const rootReducer = combineReducers({
	coursesReducer,
	authorsReducer,
	usersReducer,
});

const middleware = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedMiddleware = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, composedMiddleware);

export default store;
