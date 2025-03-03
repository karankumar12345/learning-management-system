"use client";

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

import authSlice from "./user/authSlice";


export const store =configureStore({
    reducer:{
     [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSlice
    }

});


