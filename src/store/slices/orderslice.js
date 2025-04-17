import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name : "orders",
    initialState : {
        list : [],
    },
    reducers : {
        addOrder : (state, action) => {
            state.list.push(action.payload);
        }
    }
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;