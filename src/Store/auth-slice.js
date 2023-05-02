import { createSlice } from "@reduxjs/toolkit";

const initialState= { 
    isAuthenticated: !!localStorage.getItem('email'),
    token: localStorage.getItem('token'),
    userMail: localStorage.getItem('email')
 };

const authSlice= createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action){
            state.isAuthenticated= true;
            state.token= action.payload.token;
            state.userMail= action.payload.email;
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('email', action.payload.email)
        },
        logout(state){
            state.isAuthenticated=false;
            localStorage.removeItem('email');
            localStorage.removeItem('token')
        }
    }
});

export const authAction= authSlice.actions;

export default authSlice.reducer;