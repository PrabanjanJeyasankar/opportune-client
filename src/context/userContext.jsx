import { useQueryClient } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'

// Create a context to manage and share user-related data across the application
const UserContext = createContext(null)

// Constants for localStorage keys to store user data and login status
const USER_DATA_KEY = 'userData'
const IS_LOGGED_IN_KEY = 'isUserLoggedIn'

/**
 * UserProvider component that manages user authentication state and provides
 * user-related data and functions to its children via context.
 *
 * @param {ReactNode} children - The child components that will consume the context.
 * @returns {JSX.Element} - A context provider wrapping the children.
 */
export const UserProvider = ({ children }) => {
    // State to store user data and login status
    const [userData, setUserData] = useState(null)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    // Access the query client from React Query to manage query cache
    const queryClient = useQueryClient()

    // Effect to load user data and login status from localStorage on component mount
    useEffect(() => {
        try {
            // Retrieve user data and login status from localStorage
            const storedUserData = localStorage.getItem(USER_DATA_KEY)
            const storedLoginStatus = localStorage.getItem(IS_LOGGED_IN_KEY)

            // If user data exists in localStorage, parse and set it in state
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData))
            }

            // If login status exists in localStorage, parse and set it in state
            if (storedLoginStatus) {
                setIsUserLoggedIn(JSON.parse(storedLoginStatus))
            }
        } catch (error) {
            // Log an error if there's an issue loading data from localStorage
            console.error('Error loading user data from localStorage:', error)
        }
    }, [])

    /**
     * Updates the user data in state and localStorage.
     *
     * @param {Object} data - The user data to be stored.
     */
    const updateUserData = (data) => {
        setUserData(data) // Update user data in state
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(data)) // Store user data in localStorage
        queryClient.invalidateQueries(['projectTags']) // Invalidate cached queries related to project tags
    }

    /**
     * Updates the login status in state and localStorage.
     *
     * @param {boolean} status - The login status to be stored.
     */
    const updateLoginStatus = (status) => {
        setIsUserLoggedIn(status) // Update login status in state
        localStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify(status)) // Store login status in localStorage
    }

    /**
     * Invalidates the query cache for home feed projects.
     * Useful when user logs out or data needs to be refreshed.
     */
    const invalidateQueryCache = () => {
        queryClient.invalidateQueries({ queryKey: ['homeFeedProjects'] })
    }

    /**
     * Sets authenticated user details in context and updates localStorage.
     *
     * @param {Object} user - The authenticated user's data.
     */
    const setAuthenticatedUserDetailsInContext = (user) => {
        updateUserData(user) // Update user data
        updateLoginStatus(true) // Set login status to true
    }

    /**
     * Removes authenticated user details from context and localStorage.
     * Also invalidates relevant query caches.
     */
    const removeAuthenticatedUserDetailsInContext = () => {
        updateUserData(null) // Clear user data
        updateLoginStatus(false) // Set login status to false
        invalidateQueryCache() // Invalidate cached queries
    }

    // Provide user data and functions to child components via context
    return (
        <UserContext.Provider
            value={{
                userData,
                isUserLoggedIn,
                setAuthenticatedUserDetailsInContext,
                removeAuthenticatedUserDetailsInContext,
                updateUserData,
                updateLoginStatus,
            }}>
            {children}
        </UserContext.Provider>
    )
}

// Export the UserContext for use in other components
export { UserContext }

// In the code above, we have created a  UserProvider  component that manages user authentication state and provides user-related data and functions to its children via context. The  UserProvider  component uses the  useQueryClient  hook from React Query to access the query client and manage the query cache.
// The  UserProvider  component initializes the user data and login status state by loading them from  localStorage  when the component mounts. It also provides functions to update the user data and login status, invalidate the query cache, set authenticated user details in context, and remove authenticated user details from context.
// The  UserContext  is created using the  createContext  function from React and exported for use in other components.
// Step 3: Create a Custom Hook to Access User Context
// Next, we will create a custom hook called  useUser  to access the user context in other components. The  useUser  hook will allow us to easily access the user data and functions provided by the  UserProvider  component.
// Create a new file named  useUser.js  in the  src/hooks  directory and add the following code to define the  useUser  custom hook:
