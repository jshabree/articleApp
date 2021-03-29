import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "../reducers/index";

const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware];
const initialState = {};

// if (process.env.NODE_ENV === "development") {
middleware.push(logger);
// }

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);

export default store;