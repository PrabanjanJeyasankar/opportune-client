import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
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

const ProjectCardComponent = ({ filteredProjects, isLoading }) => {
    return (
        <div className={styles.initial_project_whole_container}>
            <div className={styles.project_display_container}>
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
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 100 100'
                            width='100'
                            height='100'
                            className={styles.clock_svg}>
                            <circle
                                cx='50'
                                cy='50'
                                r='45'
                                stroke='#ddd'
                                strokeWidth='5'
                                fill='none'
                            />
                            <line
                                x1='50'
                                y1='50'
                                x2='50'
                                y2='20'
                                stroke='#555'
                                strokeWidth='4'
                                strokeLinecap='round'>
                                <animateTransform
                                    attributeName='transform'
                                    type='rotate'
                                    from='0 50 50'
                                    to='360 50 50'
                                    dur='2s'
                                    repeatCount='indefinite'
                                />
                            </line>
                            <line
                                x1='50'
                                y1='50'
                                x2='75'
                                y2='50'
                                stroke='#888'
                                strokeWidth='3'
                                strokeLinecap='round'>
                                <animateTransform
                                    attributeName='transform'
                                    type='rotate'
                                    from='0 50 50'
                                    to='360 50 50'
                                    dur='5s'
                                    repeatCount='indefinite'
                                />
                            </line>
                        </svg>

                        <p>
                            &quot;No projects here... yet! It&apos;s like an
                            empty canvas waiting for your masterpiece!&quot;
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
                        toast({ description: 'Please login to upvote.' })
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

                    <ShareIconSvg className={styles.share_icon} />
                </div>
            </div>
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
    }).isRequired,
}

ProjectCardComponent.propTypes = {
    filteredProjects: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default ProjectCardComponent
