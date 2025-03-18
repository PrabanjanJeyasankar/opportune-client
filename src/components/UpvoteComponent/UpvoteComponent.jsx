import useUpvote from '@/hooks/useUpvote'
import NumberFlow from '@number-flow/react'
import styles from './UpvoteComponent.module.css'
import UpvoteIconSvg from '@/svg/UpvoteIconSvg/UpvoteIconSvg'

function UpvoteComponent({ project }) {
    const { isUpvoted, upvoteCount, handleUpvoteClick } = useUpvote(project)

    return (
        <div
            className={`${styles.upvotes} ${isUpvoted ? styles.upvoted : ''}`}
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
    )
}

export default UpvoteComponent
