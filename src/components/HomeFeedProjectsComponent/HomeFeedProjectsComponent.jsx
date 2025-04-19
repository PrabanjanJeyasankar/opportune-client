import { useRef, useCallback, useEffect } from 'react'
import ProjectCardComponent from '../ProjectCardComponent/ProjectCardComponent'
import InfiniteLoadingAnimation from '@/loaders/InfiniteLoadingAnimation/InfiniteLoadingAnimation'
import styles from './HomeFeedProjectsComponent.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectProjects,
    selectProjectsError,
    selectProjectsFetchingMore,
    selectProjectsHasMore,
    selectProjectsLoading,
} from '@/app/features/projects/projectsSelectors'
import {
    fetchInitialProjects,
    fetchMoreProjects,
} from '@/app/features/projects/projectsThunks'
import useDebouncedSearchTerm from '@/hooks/useDebouncedSearchTerm'

const HomeFeedProjectsComponent = () => {
    const dispatch = useDispatch()
    const projects = useSelector(selectProjects)
    const loading = useSelector(selectProjectsLoading)
    const error = useSelector(selectProjectsError)
    const hasMoreProject = useSelector(selectProjectsHasMore)
    const isFetchingMore = useSelector(selectProjectsFetchingMore)
    
    const debouncedSearchTerm = useDebouncedSearchTerm();
    
    const observerRef = useRef(null)
    const loadingRef = useRef(null)

    useEffect(() => {
        dispatch(fetchInitialProjects());
    }, [debouncedSearchTerm, dispatch]); 

    const observerCallback = useCallback(
        (entries) => {
            const [entry] = entries
            if (entry.isIntersecting && hasMoreProject && !isFetchingMore) {
                dispatch(fetchMoreProjects())
            }
        },
        [hasMoreProject, isFetchingMore]
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

    const projectsDataLength = projects?.length

    return (
        <div className={styles.home_feed_projects_container}>
            <ProjectCardComponent projects={projects} isLoading={loading} />

            <div ref={loadingRef}>
                {projectsDataLength > 0 && hasMoreProject ? (
                    <div className={styles.loading_container}>
                        <InfiniteLoadingAnimation />
                    </div>
                ) : (
                    <div className={styles.divider_container}>
                        <div className={styles.divider_stripe_left} />
                        <p className={styles.end_of_results}>End of results</p>
                        <div className={styles.divider_stripe_right} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeFeedProjectsComponent
