// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: null,
    userDetails: null,
  },
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.uid = null;
      state.userDetails = null;
    },
  },
});

export const { setUid, setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
