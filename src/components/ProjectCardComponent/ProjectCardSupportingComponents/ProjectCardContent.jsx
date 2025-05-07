import PropTypes from 'prop-types'
import styles from '../ProjectCardComponent.module.css'
import ProjectCardButtons from './ProjectCardButtons'

function ProjectCardContent({ project, handleShareClick }) {
    return (
        <div className={styles.project_card_content}>
            <div className={styles.project_card_header}>
                <div className={styles.project_card_title}>{project.title}</div>

                <p>by</p>
                <div>
                    <img
                        className={styles.project_card_user_profile_picture}
                        src={project?.authorDetails?.profilePicture}
                        alt='User profile image'
                        aria-label='user profile image'
                    />
                </div>
            </div>

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
            <ProjectCardButtons project={project} handleShareClick={handleShareClick} />
        </div>
    )
}

// ProjectCardContent.propTypes = {
//     project: PropTypes.shape({
//         title: PropTypes.string,
//         tags: PropTypes.array,
//         description: PropTypes.string,
//     }).isRequired,
//     isUpvoted: PropTypes.bool.isRequired,
//     upvoteCount: PropTypes.number.isRequired,
//     handleUpvoteClick: PropTypes.func.isRequired,
//     handleShareClick: PropTypes.func.isRequired,
// }

export default ProjectCardContent
