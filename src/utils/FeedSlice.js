import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeFeed:(state,actiom)=>null,
    }
});

export const {addFeed }= feedSlice.actions;
export default feedSlice.reducer;
