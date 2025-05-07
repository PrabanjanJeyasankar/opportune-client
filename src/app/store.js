import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

/**
 * Configures and creates the Redux store for the application.
 * 
 * The store is the central place that holds the state of the application.
 * It is created using `configureStore` from Redux Toolkit, which is a simplified way to set up a Redux store with good defaults.
 * 
 * @returns {import('@reduxjs/toolkit').EnhancedStore} - The configured Redux store.
 */
const store = configureStore({
    reducer: rootReducer,
})

export default store
