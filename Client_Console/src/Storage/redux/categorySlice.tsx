import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setCategoryItem: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategoryItem } = categorySlice.actions;
export const cateogryReducer = categorySlice.reducer;
