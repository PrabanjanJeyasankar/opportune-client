import { Navigate } from 'react-router-dom'

/**
 * ProtectedRoute - Restricts access to routes that require authentication.
 * @param {Object} props
 * @param {boolean} props.isAuthenticated - User authentication status
 * @param {JSX.Element} props.children - Component to render
 */
const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to='/login' replace />
}

export default ProtectedRoute
