import { toast } from '@/hooks/use-toast'
import projectService from '@/services/projectService'
import NumberFlow from '@number-flow/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UpvoteIconSvg from '../../svg/UpvoteIconSvg/UpvoteIconSvg'
import styles from './UpvoteComponent.module.css'
import useUserContext from '@/hooks/useUserContext'

const UpvoteComponent = ({
    projectSlug,
    initialUpvoteCount,
    initialIsUpvoted,
    className,
    showCount = true,
    iconSize,
    compact = false,
}) => {
    const [isUpvoted, setIsUpvoted] = useState(initialIsUpvoted || false)
    const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount || 0)
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
            ? projectService.upvoteProject(projectSlug)
            : projectService.deleteUpvoteProject(projectSlug)

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

    return (
        <div
            className={`${styles.upvote_container} ${className || ''} ${
                isUpvoted ? styles.upvoted : ''
            } ${compact ? styles.compact : ''}`}
            onClick={handleUpvoteClick}>
            <UpvoteIconSvg
                className={styles.upvote_icon}
                style={{
                    stroke: isUpvoted ? '#7DFF40' : 'white',
                    fill: isUpvoted ? '#7DFF40' : 'none',
                    width: iconSize,
                    height: iconSize,
                }}
            />
            {showCount && (
                <span className={styles.count}>
                    <NumberFlow
                        value={upvoteCount}
                        format={{ notation: 'compact' }}
                    />
                </span>
            )}
        </div>
    )
}

UpvoteComponent.propTypes = {
    projectSlug: PropTypes.string.isRequired,
    initialUpvoteCount: PropTypes.number,
    initialIsUpvoted: PropTypes.bool,
    className: PropTypes.string,
    showCount: PropTypes.bool,
    iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    compact: PropTypes.bool,
}

export default UpvoteComponent
