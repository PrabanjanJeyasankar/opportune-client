import { Navigate, useLocation } from 'react-router-dom'

/**
 * AuthFlowRoute - Ensures the user follows a step-by-step authentication flow.
 * @param {Object} props
 * @param {Object} props.requiredState - Required state values to proceed
 * @param {string} props.redirectPath - Path to redirect if conditions are not met
 * @param {JSX.Element} props.children - Component to render
 */
const AuthenticationFlowRoute = ({ requiredState, redirectPath, children }) => {
    const location = useLocation()

    const isValid = Object.keys(requiredState).every(
        (key) => location.state?.[key]
    )

    return isValid ? children : <Navigate to={redirectPath} replace />
}

export default AuthenticationFlowRoute
