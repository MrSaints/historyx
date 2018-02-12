import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "./index.css";

import reducer from "./reducer";
import App from "./container/App";

const storeMiddlewares = [thunk];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
    storeMiddlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...storeMiddlewares));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
