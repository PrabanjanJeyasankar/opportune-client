import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import ParticlesMotionComponent from './components/SupportingComponents/ParticlesMotionComponent/ParticlesMotionComponent'
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
                <div
                    style={{
                        position: 'fixed',
                        // width: '100%',
                        // height: '100vh',
                        // zIndex: 10000,
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        zIndex: '1',
                    }}>
                    <ParticlesMotionComponent
                        particleColors={['#666', '#666']}
                        particleBaseSize={100}
                        disableRotation={false}
                    />
                </div>
            </Router>
        </HomeFeedResetContextProvider>
    )
}

export default App
