//setup common redux store for all web-apps

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import { productApi } from "remote/productApi";
import drawerReducer from './slices/drawerSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    [productApi.reducerPath]: productApi.reducer,
    drawer: drawerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
