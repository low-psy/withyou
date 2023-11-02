import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerSearch: {
    where: false,
    when: false,
    guest: false,
  },
  headerModalSearch: {
    travleSearch: false,
    checkIn: false,
    checkOut: false,
    guest: false,
  },
  headerModalCategory: {
    place: true,
    activate: false,
    online: false,
  },
};
const headerSearchSlice = createSlice({
  name: "headerSearch",
  initialState,
  reducers: {
    headerSearchToggle(state, action) {
      switch (action.payload) {
        case "where":
          state.headerSearch = { ...initialState.headerSearch, where: true };
          return state;
        case "when":
          state.headerSearch = { ...initialState.headerSearch, when: true };
          return state;
        case "guest":
          state.headerSearch = { ...initialState.headerSearch, guest: true };
          return state;
        case "default":
          state.headerSearch = initialState.headerSearch;
          return state;
        default:
          return;
      }
    },
    headerModalSearchToggle(state, action) {
      switch (action.payload) {
        case "travle_search":
          state.headerModalSearch = {
            ...initialState.headerModalSearch,
            travleSearch: true,
          };
          return state;
        case "check_in":
          state.headerModalSearch = {
            ...initialState.headerModalSearch,
            checkIn: true,
          };
          return state;
        case "check_out":
          state.headerModalSearch = {
            ...initialState.headerModalSearch,
            checkOut: true,
          };
          return state;
        case "guest":
          state.headerModalSearch = {
            ...initialState.headerModalSearch,
            guest: true,
          };
          return state;
        case "default":
          state.headerModalSearch = initialState.headerModalSearch;
          return state;
        default:
          return;
      }
    },
    headerModalCategoryToggle(state, action) {
      switch (action.payload) {
        case "place":
          state.headerModalCategory = {
            ...initialState.headerModalCategory,
            place: true,
          };
          return state;
        case "activate":
          state.headerModalCategory = {
            ...initialState.headerModalCategory,
            place: false,
            activate: true,
          };
          return state;
        case "online":
          state.headerModalCategory = {
            ...initialState.headerModalCategory,
            place: false,
            online: true,
          };
          return state;
        case "default":
          state.headerModalCategory = initialState.headerModalCategory;
          return state;
        default:
          return;
      }
    },
  },
});

export const actions = headerSearchSlice.actions;
export const reducer = headerSearchSlice.reducer;
