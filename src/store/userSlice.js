import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {},
    isAuth: false,
    isLoading: false,
  },
  reducers: {
    setAuth(state, action) { state.isAuth = action.payload.isAuth; },
    setUser(state, action) { state.user = action.payload.user; },
    setLoading(state, action) { state.isLoading = action.payload.isLoading; },
  }
});

export default userSlice.reducer;
export const { setAuth, setUser, setLoading } = userSlice.actions;
