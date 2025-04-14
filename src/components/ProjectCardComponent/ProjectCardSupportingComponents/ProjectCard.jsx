import SharePopoverComponent from '@/components/SupportingComponents/SharePopoverComponent/SharePopoverComponent'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../ProjectCardComponent.module.css'
import ProjectCardContent from './ProjectCardContent'
import ProjectCardImage from './ProjectCardImage'

function ProjectCard({ project }) {
    const [isSharePopoverOpen, setIsSharePopoverOpen] = useState(false)
    const navigate = useNavigate()


    function handleCardClick() {
        // setCurrentViewingProject(project)
        navigate(`/${project.authorDetails.username}/${project.slug}`, {
            state: { project },
        })
    }

    function handleShareClick(e) {
        e.stopPropagation()
        setIsSharePopoverOpen(true)
    }

    return (
        <div
            className={styles.project_card_container}
            onClick={handleCardClick}>
            <ProjectCardImage project={project} />
            <ProjectCardContent
                project={project}
                handleShareClick={handleShareClick}
            />
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
        slug: PropTypes.string.isRequired,
        isUserLiked: PropTypes.bool,
        authorDetails: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
}

export default ProjectCard
