import { useRef, useCallback, useEffect } from 'react'
import ProjectCardComponent from '../ProjectCardComponent/ProjectCardComponent'
import InfiniteLoadingAnimation from '@/loaders/InfiniteLoadingAnimation/InfiniteLoadingAnimation'
import styles from './HomeFeedProjectsComponent.module.css'
import useProjectContext from '@/hooks/useProjectContext'

const HomeFeedProjectsComponent = () => {
    const {
        filteredProjects,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isOnline,
        refetch,
    } = useProjectContext()

    const observerRef = useRef(null)
    const loadingRef = useRef(null)

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

            return () => observerRef.current?.unobserve(currentLoadingRef)
        }
    }, [loadingRef, observerCallback])

    return (
        <div className={styles.home_feed_projects_container}>
            {!isOnline && (
                <div className={styles.offline_message}>
                    <p>
                        You are currently offline. Some content may not be up to
                        date.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className={styles.retry_button}>
                        Try Again
                    </button>
                </div>
            )}

            <ProjectCardComponent
                filteredProjects={filteredProjects}
                isLoading={isLoading}
            />

            {filteredProjects.length > 0 ? (
                hasNextPage && !isLoading ? (
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
