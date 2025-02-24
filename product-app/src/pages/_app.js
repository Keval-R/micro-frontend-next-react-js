"use client";

import { Provider } from "react-redux";
import { store } from "host/hostStore";
import "@/styles/globals.css";
import "@ant-design/v5-patch-for-react-19";

export default function App({ Component, pageProps }) {
  return (
    //redux store wrapper
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
