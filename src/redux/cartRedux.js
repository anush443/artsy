import { createSlice } from "@reduxjs/toolkit";

const cartSilce = createSlice({
  name: "cart",
  initialState: {
    artworks: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addArtwork: (state, action) => {
      state.quantity += 1;
      state.artworks.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeArtwork: (state, action) => {
      state.quantity -= 1;
      state.artworks.pop(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addArtwork, removeArtwork } = cartSilce.actions;

export default cartSilce.reducer;
