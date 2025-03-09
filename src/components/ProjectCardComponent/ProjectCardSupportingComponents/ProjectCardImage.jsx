import ArrowUpRightSvg from '@/svg/ArrowUpRightSvg/ArrowUpRightSvg'
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
            <a
                href={project.hostedLink}
                target='_blank'
                rel='noopener noreferrer'
                className={styles.project_card_arrow_link}>
                <span className={styles.project_card_arrow}>
                    <ArrowUpRightSvg />
                </span>
            </a>
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
