import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL, // Ensure using NEXT_PUBLIC for env variables in Next.js
    credentials: "include",
    prepareHeaders: (headers) => {
        // Assume tokens are stored in cookies and handled server-side
        return headers; // No token management needed here
      },
  }),
  endpoints: (builder) => ({
    USERDATA:builder.query({
        query: () => ({
          url: "api/user",
          method: "GET",
        }),
      
      }

    )
  }), // Define endpoints here
});

export const { useUSERDATAQuery }=apiSlice

export default apiSlice;
