import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import StarryMotionComponent from './components/StarryMotionComponent/StarryMotionComponent'
import { UserProvider } from './context/userContext'
import AppRoutes from './routes/AppRoutes'
import InitialLoadingAnimation from './loaders/InitialLoadingAnimation/InitialLoadingAnimation'

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate initial loading time
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000) // 2 seconds delay

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <InitialLoadingAnimation />
    }

    return (
        <Router>
            <UserProvider>
                <AppRoutes />
            </UserProvider>
            <StarryMotionComponent />
        </Router>
    )
}

export default App
