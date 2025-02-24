import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.find((p) => p.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new product
      }
    },
    removeProduct: (state, action) => {
      return state.filter((p) => p.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const product = state.find((p) => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.find((p) => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        return state.filter((p) => p.id !== action.payload); // Remove if quantity is 0
      }
    }
  }
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity } = productSlice.actions;
export default productSlice.reducer;
