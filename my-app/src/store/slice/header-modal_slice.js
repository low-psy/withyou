import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  travle: "",
  checkIn: {
    month: 0,
    date: 0
  },
  checkOut: {
    month: 0,
    date: 0
  },
  guest: {
    adult: 0,
    children: 0,
    baby: 0,
    animal: 0
  }
}

const headerModalSlice = createSlice({
  name: "headerModal",
  initialState: initialState,
  reducers: {
    travleSearch(state, action) {
      state.travle = action.payload;
      return state;
    },
    addCheckIn(state, action) {
      state.checkIn = {
        month: action.payload.month,
        date: action.payload.date,
      };
      return state;
    },
    addCheckOut(state, action) {
      state.checkOut = {
        month: action.payload.month,
        date: action.payload.date,
      };
      return state;
    },
    addGuest(state, action) {
      switch (action.payload) {
        case "adult":
          state.guest.adult++;
          return state;
        case "children":
          state.guest.children++;
          return state;
        case "baby":
          state.guest.baby++;
          return state;
        case "animal":
          state.guest.animal++;
          return state;
        default: return;
      }
    },
    removeGuest(state, action) {
      switch (action.payload) {
        case "adult":
          state.guest.adult--;
          return state;
        case "children":
          state.guest.children--;
          return state;
        case "baby":
          state.guest.baby--;
          return state;
        case "animal":
          state.guest.animal--;
          return state;
        default:
          return;
      }
    },
    defaultAll(state) {
      state = initialState;
      return state;
    },
    defaultTravle(state) {
      state.travle = initialState.travle;
      return state;
    },
    defaultCheck(state) {
      state.checkIn = initialState.checkIn;
      state.checkOut = initialState.checkOut;
      return state;
    },
  },
});

export const reducer = headerModalSlice.reducer
export const actions = headerModalSlice.actions