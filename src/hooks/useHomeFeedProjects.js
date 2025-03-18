import { useInfiniteQuery } from '@tanstack/react-query'
import fetchHomeFeedProjectsService from '../services/fetchHomeFeedProjects'

const useHomeFeedProjects = (debouncedSearchTerm, selectedTag, isOnline) => {
    return useInfiniteQuery({
        queryKey: [
            'homeFeedProjects',
            { searchTerm: debouncedSearchTerm, selectedTag },
        ],
        queryFn: ({ pageParam = 1 }) =>
            fetchHomeFeedProjectsService(
                12,
                pageParam,
                debouncedSearchTerm,
                selectedTag
            ),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || !Array.isArray(lastPage)) return undefined
            return lastPage.length < 10 ? undefined : allPages.length + 1
        },
        staleTime: 60 * 1000,
        cacheTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        enabled: isOnline,
    })
}

export default useHomeFeedProjects
