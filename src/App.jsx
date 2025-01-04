import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import StarryMotionComponent from './components/StarryMotionComponent/StarryMotionComponent'

function App() {
    return (
        <Router>
            <AppRoutes />
            <StarryMotionComponent />
        </Router>
    )
}

export default App
