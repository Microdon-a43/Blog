import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import thunk from 'redux-thunk';
import { postReducer } from './reducers/postReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
