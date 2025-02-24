import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [store, setStore] = useState<any>(null);

  useEffect(() => {
    import("host/store").then((mod) => {
      setStore(mod.store);
    });
  }, []);

  if (!store) return <div>Loading...</div>;

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
