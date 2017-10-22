import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';

const configureStore = () => {
  const createStoreWithMiddleware = applyMiddleware()(createStore);
  if (process.env.NODE_ENV !== 'production') {
    const store = createStoreWithMiddleware(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(
          rootReducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        );
      });
    }
    return store;
  }
  const store = createStoreWithMiddleware(rootReducer);
  return store;
};

export default configureStore;
