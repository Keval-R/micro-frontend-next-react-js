import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "nextApp/productApi";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
}

const initialCartState = {
    cart: [] as Product[],
};


const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        setCart: (state, action: PayloadAction<Array<any>>) => {
            state.cart = action.payload;
        },

    },
});

export const { setCart } = cartSlice.actions;

const initialState = {
    visible: false,
};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        changeDrawer: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload;
        },
    },
});

export const { changeDrawer } = drawerSlice.actions;


export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        drawer: drawerSlice.reducer,
        [productApi.reducerPath]: productApi?.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi?.middleware),
});

// Export types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
