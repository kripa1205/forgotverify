import { createSlice } from "@reduxjs/toolkit";

const toastslice = createSlice({
    name:'toast',
    initialState:{
        message:'',
        type:''

    },

    reducers:{
        showtoast(state,actions){
            state.message=actions.payload.message
            state.type = actions.payload.type
        },

        cleartoast(state){
            state.message=''
            state.type=''
        }
    }
})

export const {showtoast,cleartoast}= toastslice.actions
export default toastslice.reducer