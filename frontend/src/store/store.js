import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
