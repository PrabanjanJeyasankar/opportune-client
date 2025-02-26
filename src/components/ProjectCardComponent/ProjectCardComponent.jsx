import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import FloatingAstronautAnimation from '@/loaders/FloatingAstronautAnimation/FloatingAstronautAnimation'
import projectService from '@/services/projectService'
import NumberFlow from '@number-flow/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageComponent from '../../elements/ImageComponent/ImageComponent'
import ShareIconSvg from '../../svg/ShareIconSvg/ShareIconSvg'
import UpvoteIconSvg from '../../svg/UpvoteIconSvg/UpvoteIconSvg'
import SkeletonCardComponent from '../SupportingComponents/SkeletonCardComponent/SkeletonCardComponent'
import styles from './ProjectCardComponent.module.css'
import SharePopoverComponent from '../SupportingComponents/SharePopoverComponent/SharePopoverComponent'

const ProjectCardComponent = ({ filteredProjects, isLoading }) => {
    return (
        <div className={styles.initial_project_whole_container}>
            <div
                className={`${styles.project_display_container} ${
                    !isLoading && filteredProjects.length === 0
                        ? styles.no_result_flex_center
                        : ''
                }`}>
                {isLoading ? (
                    Array.from({ length: 15 }).map((_, index) => (
                        <SkeletonCardComponent key={index} />
                    ))
                ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))
                ) : (
                    <div className={styles.no_results}>
                        <FloatingAstronautAnimation />
                        <p className={styles.no_tag_result_text}>
                            This tag is feeling lonely! Be the first to add a
                            project.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

const ProjectCard = ({ project }) => {
    const [isUpvoted, setIsUpvoted] = useState(project.isUpvoted || false)
    const [upvoteCount, setUpvoteCount] = useState(project.upvoteCount)
    const [isSharePopoverOpen, setIsSharePopoverOpen] = useState(false)
    const navigate = useNavigate()
    const { isUserLoggedIn } = useUserContext()

    const handleUpvoteClick = (e) => {
        e.stopPropagation()

        if (!isUserLoggedIn) {
            toast({
                description: 'Please login to upvote.',
            })
            navigate('/login')
            return
        }

        const newUpvoteState = !isUpvoted
        setIsUpvoted(newUpvoteState)
        setUpvoteCount((prev) => (newUpvoteState ? prev + 1 : prev - 1))

        const upvoteAction = newUpvoteState
            ? projectService.upvoteProject(project.slug)
            : projectService.deleteUpvoteProject(project.slug)

        upvoteAction
            .then((response) => {
                if (response.status !== 200)
                    throw new Error('Failed to update upvote')
            })
            .catch((error) => {
                setIsUpvoted(!newUpvoteState) // Revert state
                setUpvoteCount((prev) => (newUpvoteState ? prev - 1 : prev + 1)) // Revert count

                console.error(error)

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
                        description:
                            'Unexpected error. Please try again later.',
                    })
                }
            })
    }

    const handleShareClick = (e) => {
        e.stopPropagation()
        setIsSharePopoverOpen(true)
    }

    const handleCardClick = () => {
        console.log(project)
        navigate(`/${project.authorDetails.username}/${project.slug}`, {
            state: { project },
        })
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

ProjectCard.propTypes = {
    project: PropTypes.shape({
        thumbnailUrl: PropTypes.string,
        title: PropTypes.string,
        tags: PropTypes.array,
        description: PropTypes.string,
        upvoteCount: PropTypes.number,
        projectTitle: PropTypes.string,
        slug: PropTypes.string,
        authorDetails: PropTypes.shape({
            username: PropTypes.string,
        }),
        isUpvoted: PropTypes.bool,
    }).isRequired,
}

ProjectCardComponent.propTypes = {
    filteredProjects: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default ProjectCardComponent
