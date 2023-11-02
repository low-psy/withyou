import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const mainSlice = createSlice({
  initialState: initialState,
  name: "main-item",
  reducers: {
    resetItemHandler(state, action) {
      state = initialState;
      return state;
    },
    addItemHandler(state, action) {
      state = action.payload;
      return state;
    },
    addCountHandler(state, action) {
      const targetIndex = state.findIndex((data) => data.id == action.payload);
      state[targetIndex].count += 1;
      return state;
    },
    removeCountHandler(state, action) {
      const targetIndex = state.findIndex((data) => data.id == action.payload);
      state[targetIndex].count -= 1;
      return state;
    },
    favoriteToggleHandler(state, action) {
      const targetIndex = state.findIndex((data) => data.id == action.payload);
      state[targetIndex].favorite = !state[targetIndex].favorite;
      return state;
    },
  },
});

export const actions = mainSlice.actions;
export const reducer = mainSlice.reducer;
