import React from 'react'
import {useAuth0} from "@auth0/auth0-react"
function Logout() {
    const {loginWithRedirect, isLoading, isAuthenticated, user, logout} = useAuth0()
  return (

        isAuthenticated && (
            <button className='' onClick={()=>logout()}>
                Logout
            </button>
        )
    
  )
}

export default Logout