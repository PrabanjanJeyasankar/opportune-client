import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import { Suspense, lazy } from 'react'
const FloatingAstronautAnimation = lazy(() =>
    import('@/loaders/FloatingAstronautAnimation/FloatingAstronautAnimation')
)

// import FloatingAstronautAnimation from '@/loaders/FloatingAstronautAnimation/FloatingAstronautAnimation'
import projectService from '@/services/projectService'
import NumberFlow from '@number-flow/react'
import { useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import ShareIconSvg from '../../svg/ShareIconSvg/ShareIconSvg'
import UpvoteIconSvg from '../../svg/UpvoteIconSvg/UpvoteIconSvg'
import SharePopoverComponent from '../SupportingComponents/SharePopoverComponent/SharePopoverComponent'
import SkeletonCardComponent from '../SupportingComponents/SkeletonCardComponent/SkeletonCardComponent'
import styles from './ProjectCardComponent.module.css'

// Constants
const PROJECT_QUERY_PREFIXES = ['projects', 'project']
const PREDEFINED_QUERY_KEYS = [
    ['projects'],
    ['projects', 'all'],
    ['projects', 'featured'],
    ['projects', 'trending'],
    ['user', 'projects'],
]

const updateProjectInData = (data, projectSlug, liked) => {
    if (!data) return data

    const newData = structuredClone(data)

    const updateSingleProject = (project) => {
        if (!project || project.slug !== projectSlug) return project

        return {
            ...project,
            isUserLiked: liked,
            upvoteCount: liked
                ? (project.upvoteCount || 0) + 1
                : Math.max((project.upvoteCount || 0) - 1, 0),
        }
    }

    const updateProjectsArray = (projects) => {
        if (!Array.isArray(projects)) return projects

        return projects.map((project) =>
            project?.slug === projectSlug
                ? updateSingleProject(project)
                : project
        )
    }

    if (Array.isArray(newData)) {
        return updateProjectsArray(newData)
    }

    if (newData.data) {
        if (Array.isArray(newData.data)) {
            newData.data = updateProjectsArray(newData.data)
        } else if (
            newData.data.projects &&
            Array.isArray(newData.data.projects)
        ) {
            newData.data.projects = updateProjectsArray(newData.data.projects)
        } else if (newData.data.slug === projectSlug) {
            newData.data = updateSingleProject(newData.data)
        }
    }

    return newData
}

const ProjectCardComponent = ({ filteredProjects, isLoading, searchTerm }) => {
    if (isLoading) {
        return (
            <div className={styles.initial_project_whole_container}>
                <div className={styles.project_display_container}>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <SkeletonCardComponent key={index} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.initial_project_whole_container}>
            {isLoading ? (
                <div className={styles.project_display_container}>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <SkeletonCardComponent key={index} />
                    ))}
                </div>
            ) : filteredProjects.length > 0 ? (
                <div className={styles.project_display_container}>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={`${project.slug}-${index}`}
                            project={project}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState searchTerm={searchTerm} />
            )}
        </div>
    )
}

const EmptyState = ({ searchTerm }) => (
    <div className={styles.no_results}>
        <Suspense
            fallback={
                <div className={styles.loader_placeholder}>Loading...</div>
            }>
            <FloatingAstronautAnimation />
        </Suspense>
        <p className={styles.no_tag_result_text}>
            {searchTerm
                ? `Sorry, no projects fit '${searchTerm}'. Maybe try another search?`
                : 'This tag is feeling lonely! Be the first to add a project.'}
        </p>
    </div>
)

const ProjectCard = ({ project }) => {
    const [isUpvoted, setIsUpvoted] = useState(project.isUserLiked || false)
    const [upvoteCount, setUpvoteCount] = useState(project.upvoteCount || 0)
    const [isSharePopoverOpen, setIsSharePopoverOpen] = useState(false)

    const navigate = useNavigate()
    const { isUserLoggedIn } = useUserContext()
    const queryClient = useQueryClient()

    useEffect(() => {
        setIsUpvoted(project.isUserLiked || false)
        setUpvoteCount(project.upvoteCount || 0)
    }, [project.isUserLiked, project.upvoteCount])

    const updateProjectInCache = useCallback(
        (projectSlug, liked) => {
            const queriesFromCache = queryClient.getQueryCache().getAll()
            const projectQueryKeys = queriesFromCache.map(
                (query) => query.queryKey
            )

            const allQueryKeys = [...PREDEFINED_QUERY_KEYS, ...projectQueryKeys]

            const uniqueKeys = Array.from(
                new Set(allQueryKeys.map(JSON.stringify))
            ).map((key) => JSON.parse(key))

            uniqueKeys.forEach((queryKey) => {
                try {
                    queryClient.setQueriesData({ queryKey }, (oldData) =>
                        updateProjectInData(oldData, projectSlug, liked)
                    )
                } catch (error) {
                    console.error(
                        `Error updating query key ${queryKey}:`,
                        error
                    )
                }
            })

            queryClient.invalidateQueries(['project', projectSlug])
        },
        [queryClient]
    )

    const handleUpvoteClick = useCallback(
        (e) => {
            e.stopPropagation()

            if (!isUserLoggedIn) {
                toast({ description: 'Please login to upvote.' })
                navigate('/login')
                return
            }

            const newUpvoteState = !isUpvoted

            setIsUpvoted(newUpvoteState)
            setUpvoteCount((prev) =>
                newUpvoteState ? prev + 1 : Math.max(prev - 1, 0)
            )

            const upvoteAction = newUpvoteState
                ? projectService.upvoteProject(project.slug)
                : projectService.deleteUpvoteProject(project.slug)

            upvoteAction
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('Failed to update upvote')
                    }

                    updateProjectInCache(project.slug, newUpvoteState)
                })
                .catch((error) => {
                    setIsUpvoted(!newUpvoteState)
                    setUpvoteCount((prev) =>
                        !newUpvoteState ? prev + 1 : Math.max(prev - 1, 0)
                    )

                    handleUpvoteError(error, navigate)
                })
        },
        [
            isUpvoted,
            isUserLoggedIn,
            navigate,
            project.slug,
            updateProjectInCache,
        ]
    )

    const handleCardClick = useCallback(() => {
        navigate(`/${project.authorDetails.username}/${project.slug}`, {
            state: { project },
        })
    }, [navigate, project])

    const handleShareClick = (e) => {
        e.stopPropagation()
        setIsSharePopoverOpen(true)
    }

    return (
        <div
            className={styles.project_card_container}
            onClick={handleCardClick}>
            <div className={styles.project_card_image}>
                <ImageComponent
                    className={styles.image_template}
                    src={project.thumbnailUrl}
                    alt={`Project ${project.projectTitle}`}
                />
            </div>
            <div className={styles.project_card_content}>
                <div className={styles.project_card_title}>{project.title}</div>
                <div className={styles.project_card_tags}>
                    {project.tags.map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            className={styles.project_card_tag}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className={styles.project_card_description}>
                    {project.description}
                </div>
                <div className={styles.project_card_buttons}>
                    <div
                        className={`${styles.upvotes} ${
                            isUpvoted ? styles.upvoted : ''
                        }`}
                        onClick={handleUpvoteClick}>
                        <UpvoteIconSvg
                            className={styles.upvote_icon}
                            style={{
                                stroke: isUpvoted ? '#7DFF40' : 'white',
                                fill: isUpvoted ? '#7DFF40' : 'none',
                            }}
                        />
                        <span>
                            <NumberFlow
                                value={upvoteCount}
                                format={{ notation: 'compact' }}
                            />
                        </span>
                    </div>
                    <div
                        onClick={handleShareClick}
                        className={styles.share_icon_container}>
                        <ShareIconSvg className={styles.share_icon} />
                    </div>
                </div>
            </div>
            {isSharePopoverOpen && (
                <SharePopoverComponent
                    isOpen={isSharePopoverOpen}
                    onClose={() => setIsSharePopoverOpen(false)}
                    project={project}
                />
            )}
        </div>
    )
}

const handleUpvoteError = (error, navigate) => {
    console.error('Upvote error:', error)

    if (error.response) {
        const status = error.response.status
        if (status === 401) {
            toast({
                description: 'Please login to upvote.',
            })
            navigate('/login')
        } else if (status === 500) {
            toast({
                description: 'Server error, please try again later',
            })
        }
    } else if (error.request) {
        toast({
            description: 'Network error. Check your connection.',
        })
    } else {
        toast({
            description: 'Unexpected error. Please try again later.',
        })
    }
}

// PropTypes
ProjectCard.propTypes = {
    project: PropTypes.shape({
        thumbnailUrl: PropTypes.string,
        title: PropTypes.string,
        tags: PropTypes.array,
        description: PropTypes.string,
        upvoteCount: PropTypes.number,
        projectTitle: PropTypes.string,
        slug: PropTypes.string.isRequired,
        isUserLiked: PropTypes.bool,
        authorDetails: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

ProjectCardComponent.propTypes = {
    filteredProjects: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default ProjectCardComponent
