import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const storedUser = localStorage.getItem('userData')
    const [userProfile, setUserProfile] = useState(
        storedUser ? JSON.parse(storedUser) : {}
    )
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!storedUser)

    useEffect(() => {
        if (
            userProfile &&
            Object.keys(userProfile).length > 0 &&
            userProfile.username
        ) {
            localStorage.setItem('userData', JSON.stringify(userProfile))
            setIsUserLoggedIn(true)
        } else {
            localStorage.removeItem('userData')
            setIsUserLoggedIn(false)
        }
    }, [userProfile])

    return (
        <UserContext.Provider
            value={{
                isUserLoggedIn,
                setIsUserLoggedIn,
                userProfile,
                setUserProfile,
            }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
