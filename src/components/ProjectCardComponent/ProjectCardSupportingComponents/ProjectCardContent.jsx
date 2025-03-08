import PropTypes from 'prop-types'
import ProjectCardButtons from './ProjectCardButtons'
import styles from '../ProjectCardComponent.module.css'

function ProjectCardContent({
    project,
    isUpvoted,
    upvoteCount,
    handleUpvoteClick,
    handleShareClick,
}) {
    return (
        <div className={styles.project_card_content}>
            <div className={styles.project_card_title}>{project.title}</div>
            <div className={styles.project_card_tags}>
                {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.project_card_tag}>
                        {tag}
                    </span>
                ))}
            </div>
            <div className={styles.project_card_description}>
                {project.description}
            </div>
            <ProjectCardButtons
                isUpvoted={isUpvoted}
                upvoteCount={upvoteCount}
                handleUpvoteClick={handleUpvoteClick}
                handleShareClick={handleShareClick}
            />
        </div>
    )
}

ProjectCardContent.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string,
        tags: PropTypes.array,
        description: PropTypes.string,
    }).isRequired,
    isUpvoted: PropTypes.bool.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    handleUpvoteClick: PropTypes.func.isRequired,
    handleShareClick: PropTypes.func.isRequired,
}

export default ProjectCardContent
