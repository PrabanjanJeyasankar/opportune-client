import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import fetchProjectTags from '../services/fetchProjectTags'

const useTagsQuery = () => {
    const queryClient = useQueryClient()

    const {
        data: tagsData = [],
        isLoading,
        isError,
        status,
        refetch,
    } = useQuery({
        queryKey: ['projectTags'],
        queryFn: fetchProjectTags,
        staleTime: 3 * 60 * 1000,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        onError: (error) => {
            console.error('Error fetching tags:', error)
        },
    })

    useEffect(() => {
        const handleOnline = () => {
            refetch({ cancelRefetch: true })
            queryClient.invalidateQueries(['projectTags'])
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                refetch({ cancelRefetch: true })
            }
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [queryClient, refetch])

    return { tagsData, isLoading, isError, status, refetch }
}

export default useTagsQuery
