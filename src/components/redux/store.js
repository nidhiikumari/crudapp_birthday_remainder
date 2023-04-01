import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares = [reduxThunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
