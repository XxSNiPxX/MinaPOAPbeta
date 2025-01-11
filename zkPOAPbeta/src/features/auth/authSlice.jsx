import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'

const safeParse = (item) => {
  try {
    return JSON.parse(item);
  } catch (error) {
    return null; // Return null if parsing fails
  }
};

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null
  //
  // const userInfo = localStorage.getItem('userInfo')
  //   ? JSON.parse(localStorage.getItem('userInfo')) // Parse JSON string to object
  //   : null;

    const userInfo = safeParse(localStorage.getItem('userInfo')); // Use the safeParse helper

const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      localStorage.removeItem('userInfo') // delete token from storage
    
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null


    },
    setCredentials: (state, { payload }) => {
      state.userInfo = JSON.stringify(payload)
    },
  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload; // Ensure payload includes user info
        state.userToken = payload.accessToken

      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })

    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
  },
})

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
