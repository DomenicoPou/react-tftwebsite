// Store basic config
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

//
const initalState = {};

const middleware = [thunk];

// dev tools middleware
/*
  Simple fix to allow redux tools in production or user agents not supported by redux. Useful in testing enviroments.
*/
const composeSetup =
    process.env.NODE_ENV !== "production" &&
        typeof window === "object" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const store = createStore(
    rootReducer,
    initalState,
    composeSetup(applyMiddleware(...middleware))
);

export default store;
