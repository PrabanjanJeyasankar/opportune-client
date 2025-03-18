import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const queryClient = useQueryClient()

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true)
            queryClient.invalidateQueries({
                queryKey: ['homeFeedProjects'],
                refetchType: 'all',
            })
        }

        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [queryClient])

    return isOnline
}

export default useOnlineStatus
