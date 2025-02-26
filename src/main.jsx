import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient()

const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
})

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 3,
})

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </StrictMode>
    </QueryClientProvider>
)
