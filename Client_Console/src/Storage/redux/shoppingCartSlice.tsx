import { createSlice } from "@reduxjs/toolkit";
import shoppingCartModel from "../../Interfaces/shoppingCartModel";

const initialState: shoppingCartModel = {
  cartItems: [],
  isCartOpen: false,
};

export const shoppingCartSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },

    updateQuantity: (state, action) => {
      //payload - cart item that needs to be updated, newquantity
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.number = action.payload.number;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      //payload - cart item that needs to be updated, newquantity
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },

    emptyCart: (state) => {
      state.cartItems = [];
    },
    setIsCartOpen: (state, action) => {
      return { ...state, isCartOpen: action.payload };
    },
  },
});

export const {
  setShoppingCart,
  updateQuantity,
  removeFromCart,
  emptyCart,
  setIsCartOpen,
} = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
