import { createSlice } from "@reduxjs/toolkit";

const initialExpState={
    items:[],
    activePremium: !!localStorage.getItem('active premium'),
    theme: 'light'
};

const ExpSlice=createSlice({
    name:'Expense',
    initialState:initialExpState,
    reducers:{
        addItemHandler(state,action){
            //console.log(action.payload);
            state.items=action.payload; // storing data one by one
        },
        premiun(state){
            state.activePremium= true;
            localStorage.setItem("premium", true);
        },
        nonPremium(state){
            state.activePremium= false;
            localStorage.removeItem("premium");
            localStorage.removeItem('changetheme');
        },
        changeTheme(state){
            state.theme= !state.theme;
            localStorage.setItem('changetheme', state.theme);
        }
    }
});

export const expAction=ExpSlice.actions;
export default ExpSlice.reducer;