import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: null,
    alluser:[],
    message: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRegistration: (state, action) => {
            state.user = action.payload;
            state.message = "Registration successful";
        },
        userLogin: (state, action) => {
            state.user = action.payload;
            state.message = "Login successful";
        },
        userLogout: (state) => {
            state.user = null;
            state.message = "Logout successful";
        },
        userUpdate: (state, action) => {
            state.user = action.payload;
            state.message = "User updated successfully";
        },
        userDelete: (state) => {
            state.user = null;
            state.message = "User deleted successfully";
        },
        userPasswordUpdate: (state) => {
            state.message = "Password updated successfully";
        },
        getAllUser:(state,action)=>{
            state.alluser=action.payload
        
        },
        singleUser:(state, action)=>{
            state.user=action.payload
        }

    },
});

// Export the actions
export const { userRegistration, userLogin, userLogout, userUpdate, userDelete, userPasswordUpdate, getAllUser, singleUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
