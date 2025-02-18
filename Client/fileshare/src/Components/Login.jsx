import React from 'react'
import {useAuth0} from "@auth0/auth0-react"
function Login() {
    const {loginWithRedirect, isLoading, isAuthenticated, user, logout} = useAuth0()
  return (
    
        !isAuthenticated && (
            <button onClick={()=>loginWithRedirect()}>
                Login
            </button>
  )
    
  )
}

export default Login