import {
  applyMiddleware,
  createStore
} from 'redux';
import thunkMiddleWare from "redux-thunk";
import { createLogger } from "redux-logger";
import {
  persistReducer,
  persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import rootReducer from "../reducers/index";

const persistConfig = {
  debug: true,
  key: 'root',
  storage,
  stateReconciler: hardSet
};

const persistedReducer = persistReducer(persistConfig, rootReducer)
const loggerMiddleWare = createLogger();
let store;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleWare, loggerMiddleWare)
  );
} else {
  store = createStore(
    persistedReducer,
    applyMiddleware(thunkMiddleWare)
  );
}

export const persistor = persistStore(store);
export default store;
