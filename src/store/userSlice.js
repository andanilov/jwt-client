import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {},
    isAuth: false,
    isLoading: false,
    popUpAuthType: '', // log | ger | rem
    authError: '',
    authMessage: '',
  },
  reducers: {
    setAuth(state, action) { state.isAuth = action.payload.isAuth; },
    setUser(state, action) { state.user = action.payload.user; },
    setLoading(state, action) { state.isLoading = action.payload.isLoading; },
    setPopUpAuthType(state, action) { state.popUpAuthType = action.payload; },
    setAuthError(state, action) { state.authError = action.payload; },
    setAuthMessage(state, action) { state.authMessage = action.payload; },
  }
});

export default userSlice.reducer;
export const { 
  setAuth,
  setUser,
  setLoading,
  setPopUpAuthType,
  setAuthError,
  setAuthMessage,
} = userSlice.actions;
