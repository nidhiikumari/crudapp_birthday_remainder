// import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { rootSaga } from './saga';
// import rootReducer from './rootReducer';

// const sagaMiddleware = createSagaMiddleware();
// // const middlewares = [sagaMiddleware];

// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);

// export default store;

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middlewares = [reduxThunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
