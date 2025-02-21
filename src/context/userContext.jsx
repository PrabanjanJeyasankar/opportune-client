import React, { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('userData')
        if (token && userData) {
            setIsUserLoggedIn(true)
            setUserProfile(JSON.parse(userData))
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        setIsUserLoggedIn(false)
        setUserProfile(null)
    }
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
