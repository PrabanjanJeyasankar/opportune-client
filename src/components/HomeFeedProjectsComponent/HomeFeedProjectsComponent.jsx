import useHomeFeedResetContext from '@/hooks/useHomeFeedResetContext'
import useUserContext from '@/hooks/useUserContext'
import InfiniteLoadingAnimation from '@/loaders/InfiniteLoadingAnimation/InfiniteLoadingAnimation'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import fetchHomeFeedProjectsService from '../../services/fetchHomeFeedProjects'
import ProjectCardComponent from '../ProjectCardComponent/ProjectCardComponent'
import styles from './HomeFeedProjectsComponent.module.css'

const HomeFeedProjectsComponent = () => {
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const { searchTerm, selectedTag } = useHomeFeedResetContext()
    const { isUserLoggedIn } = useUserContext()
    const queryClient = useQueryClient()
    const observerRef = useRef(null)
    const loadingRef = useRef(null)
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)
        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true)
            queryClient.invalidateQueries({
                queryKey: ['homeFeedProjects'],
                refetchType: 'all',
            })
        }

        const handleOffline = () => {
            setIsOnline(false)
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                queryClient.invalidateQueries({
                    queryKey: ['homeFeedProjects'],
                    refetchType: 'all',
                })
            }
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        window.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
            window.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [queryClient])

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: queryLoading,
        error: queryError,
        refetch,
    } = useInfiniteQuery({
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
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || !Array.isArray(lastPage)) {
                return undefined
            }

            const isValidArray = Array.isArray(lastPage) && lastPage.length >= 0

            return isValidArray && lastPage.length < 10
                ? undefined
                : allPages.length + 1
        },
        staleTime: 60 * 1000,
        cacheTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        enabled: isOnline,
    })

    useEffect(() => {
        if (isUserLoggedIn) {
            queryClient.invalidateQueries({ queryKey: ['homeFeedProjects'] })
        }
    }, [isUserLoggedIn, queryClient])

    const observerCallback = useCallback(
        (entries) => {
            const [entry] = entries
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage()
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    )

    useEffect(() => {
        const currentLoadingRef = loadingRef.current

        if (currentLoadingRef) {
            const observer = new IntersectionObserver(observerCallback, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            })

            observer.observe(currentLoadingRef)
            observerRef.current = observer

            return () => {
                if (currentLoadingRef && observerRef.current) {
                    observerRef.current.unobserve(currentLoadingRef)
                }
            }
        }
    }, [loadingRef, observerCallback])

    const allProjects = useMemo(() => {
        if (!data || !data.pages) return []
        return data.pages.flat()
    }, [data])

    const filteredProjects = useMemo(() => {
        if (!allProjects.length) return []
        const lowercasedSearchTerm = debouncedSearchTerm?.toLowerCase() || ''
        return allProjects.filter((project) => {
            const matchesSearchTerm =
                !debouncedSearchTerm ||
                project.title?.toLowerCase().includes(lowercasedSearchTerm)
            const matchesSelectedTag =
                !selectedTag ||
                selectedTag === 'All' ||
                (project.tags &&
                    project.tags.some(
                        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
                    ))
            return matchesSearchTerm && matchesSelectedTag
        })
    }, [debouncedSearchTerm, selectedTag, allProjects])

    const handleRetry = () => {
        refetch({ cancelRefetch: true })
    }

    return (
        <div className={styles.home_feed_projects_container}>
            {!isOnline && (
                <div className={styles.offline_message}>
                    <p>
                        You are currently offline. Some content may not be up to
                        date.
                    </p>
                    <ButtonComponent
                        onClick={handleRetry}
                        className={styles.retry_button}>
                        Try Again
                    </ButtonComponent>
                </div>
            )}

            <ProjectCardComponent
                filteredProjects={filteredProjects}
                isLoading={queryLoading}
                searchTerm={debouncedSearchTerm}
            />

            {filteredProjects.length > 0 ? (
                hasNextPage && !queryLoading ? (
                    <div ref={loadingRef} className={styles.loading_container}>
                        <InfiniteLoadingAnimation />
                    </div>
                ) : (
                    <div className={styles.divider_container}>
                        <div className={styles.divider_stripe_left} />
                        <p className={styles.end_of_results}>End of results</p>
                        <div className={styles.divider_stripe_right} />
                    </div>
                )
            ) : null}
        </div>
    )
}

export default HomeFeedProjectsComponent
