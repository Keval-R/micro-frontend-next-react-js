import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "host/hostStore";
import '@ant-design/v5-patch-for-react-19';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
