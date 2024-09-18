import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    data:{},
}
const authSlice  = createSlice({
    name:'auth',
    initialState,
    reducers:{
        register:(state,action)=>{
            state.data =action.payload;
        },
        login:(state,action)=>{
            state.data =action.payload;
        },
        logout:(state,action) => {},
        
        saveToken:(state,action) => {
            console.log("saveToken action called with payload:", action.payload);
            state.data = action.payload;
            return state
        },
        saveRevision: (state, action) => {
            state.data.activity = action.payload;
        }
    }
})
export const { register, login, logout, saveNumber, saveToken, saveProfile,saveRevision } = authSlice.actions;

export default authSlice.reducer;