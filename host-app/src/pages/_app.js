"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    //redux store wrapper
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
