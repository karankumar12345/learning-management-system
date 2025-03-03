import React from 'react'

type FormType = 'sign-in' | 'sign-up'
const AuthForm = ({type}:{type:FormType}) => {
  return (
     <div>
        <h1>{type==='sign-in'?"Sign In" : "Sign Up "}</h1>
     </div>
  )
}

export default AuthForm
