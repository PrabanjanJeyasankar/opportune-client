import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <h2>Oops! Something went wrong.</h2>
                    <p>Try refreshing the page or coming back later.</p>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
