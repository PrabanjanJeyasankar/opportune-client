import NumberFlow from '@number-flow/react'
import PropTypes from 'prop-types'
import ShareIconSvg from '../../../svg/ShareIconSvg/ShareIconSvg'
import UpvoteIconSvg from '../../../svg/UpvoteIconSvg/UpvoteIconSvg'
import styles from '../ProjectCardComponent.module.css'

function ProjectCardButtons({
    isUpvoted,
    upvoteCount,
    handleUpvoteClick,
    handleShareClick,
}) {
    return (
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
    )
}

ProjectCardButtons.propTypes = {
    isUpvoted: PropTypes.bool.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    handleUpvoteClick: PropTypes.func.isRequired,
    handleShareClick: PropTypes.func.isRequired,
}

export default ProjectCardButtons
