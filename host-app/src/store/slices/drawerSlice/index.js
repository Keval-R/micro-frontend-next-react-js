import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visible: false,
};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.visible = true;
        },
        closeDrawer: (state) => {
            state.visible = false;
        },
    },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
