import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapModalIsActive: false
}
const mapModalSlice = createSlice({
  name: 'mapModal',
  initialState,
  reducers: {
    mapModalToggle: (state, action)=>{
      state.mapModalIsActive = !state.mapModalIsActive
      return state
    }    
  }
})
export const actions = mapModalSlice.actions;
export const reducer = mapModalSlice.reducer;