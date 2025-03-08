import PropTypes from 'prop-types'
import ImageComponent from '../../../elements/ImageComponent/ImageComponent'
import styles from '../ProjectCardComponent.module.css'

function ProjectCardImage({ project }) {
    return (
        <div className={styles.project_card_image}>
            <ImageComponent
                className={styles.image_template}
                src={project.thumbnailUrl}
                alt={`Project ${project.projectTitle}`}
            />
        </div>
    )
}

ProjectCardImage.propTypes = {
    project: PropTypes.shape({
        thumbnailUrl: PropTypes.string,
        projectTitle: PropTypes.string,
    }).isRequired,
}

export default ProjectCardImage
