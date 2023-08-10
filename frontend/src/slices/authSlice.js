//createSlice just create local state
//we have apiSlice where it implement redux thunk middleware
import { createSlice } from "@reduxjs/toolkit"


const user = JSON.parse(localStorage.getItem("userInfo"))
const initialState = {
    userInfo: user ? user : null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            //name emaild id
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        //this is frontend logout to kill the local storage
        logout: (state, action) => {
            //we clear data both from state and local stroage
            state.userInfo = null
            localStorage.removeItem("userInfo")
        }
    },
})


export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer
