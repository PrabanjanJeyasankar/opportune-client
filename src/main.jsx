import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>

            <StrictMode>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </StrictMode>

    </Provider>
)
