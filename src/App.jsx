import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import StarryMotionComponent from './components/StarryMotionComponent/StarryMotionComponent'
import { UserProvider } from './context/userContext'

function App() {
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
