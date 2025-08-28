
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthState = { isAuthenticated: boolean; token?: string | null };
const initialState: AuthState = { isAuthenticated: false, token: null };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    loggedOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    }
  }
});

export const { loggedIn, loggedOut } = slice.actions;
export default slice.reducer;
