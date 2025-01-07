import React from "react"
import { useState } from "react"
import { createContext } from "react"

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userProfile, setUserProfile] = useState({})

    return (
        <UserContext.Provider
            value={{isUserLoggedIn, setIsUserLoggedIn, userProfile, setUserProfile}}
        >
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }