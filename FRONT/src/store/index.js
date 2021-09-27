/* eslint-disable linebreak-style */
import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../reducers';
import ridesMiddleware from '../middlewares/ridesMiddleware';
import signupMiddleware from '../middlewares/signupMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWares = [ridesMiddleware, signupMiddleware];

const enhancers = composeEnhancers(
  applyMiddleware(...middleWares),
);

const store = createStore(reducer, enhancers);

export default store;
