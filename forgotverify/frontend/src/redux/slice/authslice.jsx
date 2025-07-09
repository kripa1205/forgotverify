import {createSlice} from '@reduxjs/toolkit'
 const authslice= createSlice({
    name: 'auth',
    initialState:{
        auth:false,
        user:{}
    },
     
    reducers:{
        initiallogin(state,actions){
            state.auth=true,
            state.user={...actions.payload}
        },
        clearauth(state){
            state.auth=false,
            state.user={}
        }
    }
});

export const {initiallogin,clearauth}=authslice.actions
export default authslice.reducer