import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(
        localStorage.getItem('isUserLoggedIn') === 'true'
    )
    const [userProfile, setUserProfile] = useState(
        JSON.parse(localStorage.getItem('userProfile')) || {}
    )

    useEffect(() => {
        const userData = localStorage.getItem('userProfile')
        if (userData) {
            setIsUserLoggedIn(true)
            setUserProfile(JSON.parse(userData))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isUserLoggedIn', isUserLoggedIn)
    }, [isUserLoggedIn])

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
