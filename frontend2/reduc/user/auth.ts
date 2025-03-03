import apiSlice from "../apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse ={
    message:string,
    activationToken:string
}
type RegistrationData ={
    name:string,
    email:string,
    password:string
}

type LoginData = {
    email: string;
    password: string;
  };
  // Define the response type for the login endpoint
type LoginResponse = {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      // Add any other fields you expect in the user object
    };
  };
  

  export const authApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        registerUser:builder.mutation<RegistrationResponse,RegistrationData>({
            query:(data)=>({
                url:"/api/register",
                method:"POST",
                body:data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                  const result = await queryFulfilled;
                  dispatch(
                    userRegistration({
                      token: result.data.activationToken,
                      message:result.data.message
                    })
                  );
                } catch (error) {
                  console.error("Registration error:", error);
                }
              },
        }),
        activateUser: builder.mutation<void, { activation_token: string; activation_code: string }>({
            query: ({ activation_token, activation_code }) => ({
              url: 'api/activate-user',
              method: 'POST',
              body: { activation_token, activation_code },
            }),
          }),
      
    })
  })
  export const {useRegisterUserMutation,useActivateUserMutation}=authApi