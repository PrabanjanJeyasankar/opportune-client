import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import StarryMotionComponent from './components/StarryMotionComponent/StarryMotionComponent'
import ScrollToTopComponent from './components/SupportingComponents/ScrollToTopComponent/ScrollToTopComponent'
import HomeFeedResetContextProvider from './context/HomeFeedResetContext'
import { UserProvider } from './context/userContext'
import InitialLoadingAnimation from './loaders/InitialLoadingAnimation/InitialLoadingAnimation'
import AppRoutes from './routes/AppRoutes'

function App() {
    const [loading, setLoading] = useState(() => {
        return !localStorage.getItem('initialLoadComplete')
    })

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false)
                localStorage.setItem('initialLoadComplete', 'true')
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [loading])

    if (loading) {
        return <InitialLoadingAnimation />
    }

    return (
        <HomeFeedResetContextProvider>
            <Router>
                <ScrollToTopComponent />
                <UserProvider>
                    <AppRoutes />
                </UserProvider>
                <StarryMotionComponent />
            </Router>
        </HomeFeedResetContextProvider>
    )
}

export default App
