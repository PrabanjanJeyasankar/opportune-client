import UpvoteComponent from '@/components/UpvoteComponent/UpvoteComponent'
import PropTypes from 'prop-types'
import ShareIconSvg from '../../../svg/ShareIconSvg/ShareIconSvg'
import styles from '../ProjectCardComponent.module.css'

function ProjectCardButtons({ project, handleShareClick }) {
    return (
        <div className={styles.project_card_buttons}>
            <UpvoteComponent project={project} />
            <div
                onClick={handleShareClick}
                className={styles.share_icon_container}>
                <ShareIconSvg className={styles.share_icon} />
            </div>
        </div>
    )
}

ProjectCardButtons.propTypes = {
    isUpvoted: PropTypes.bool.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    handleUpvoteClick: PropTypes.func.isRequired,
    handleShareClick: PropTypes.func.isRequired,
}

export default ProjectCardButtons
