import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem("session_id");

const initialState = {
    value: token == null? false: true
}

export const authentication = createSlice({
    //using the same name
    name: "authentication",
    initialState,
    reducers:{
        loginSuccess: (state) => {
            state.value = true
        },
        loginFail: (state) => {
            state.value = false
        },
        logout: (state) => {
            state.value = false
        }
    }
})

export const {loginSuccess, loginFail, logout} = authentication.actions;

export default authentication.reducer;