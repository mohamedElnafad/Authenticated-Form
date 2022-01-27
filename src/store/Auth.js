import { createSlice } from '@reduxjs/toolkit'

export const Auth = createSlice({
  name: 'Auth',
  
  initialState: {
    isLoggedIn: !!localStorage.getItem('token'),
    // if loacal storage returned token thats mean isLogged =>true that is mean user will stay in the page || else local storage didn't return anyting => isLoggedin = false and user can't stay in page
    token: localStorage.getItem('token'),
  },
  reducers: {
    Login: (state, action) => {
      state.token = action.payload
      state.isLoggedIn = !!state.token
      localStorage.setItem('token', action.payload)

      // !! instead of thate if conditions
      // if (state.token) state.isLoggedIn = true
      // else {
      //   state.isLoggedIn = false
      // }
    },
    logout: (state) => {
      localStorage.removeItem('token')
      state.isLoggedIn = false
    },
  },
})

export const AuthActions = Auth.actions
export default Auth.reducer
