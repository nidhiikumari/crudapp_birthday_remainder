import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
