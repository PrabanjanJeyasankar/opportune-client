import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function useUpvote(project) {
    const [isUpvoted, setIsUpvoted] = useState(project.isUpvotedByUser || false)
    const [upvoteCount, setUpvoteCount] = useState(project.upvoteCount || 0)
    const navigate = useNavigate()
    const { isUserLoggedIn } = useUserContext()

    useEffect(() => {
        setIsUpvoted(project.isUpvotedByUser || false)
        setUpvoteCount(project.upvoteCount || 0)
    }, [project.isUpvotedByUser, project.upvoteCount])

    const handleUpvoteClick = useCallback(
        (e) => {
            e.stopPropagation()

            if (!isUserLoggedIn) {
                toast({ description: 'Please login to upvote.' })
                navigate('/login')
                return
            }

            setIsUpvoted((prev) => !prev)
            setUpvoteCount((prev) => (isUpvoted ? Math.max(prev - 1, 0) : prev + 1))
        },
        [isUserLoggedIn, isUpvoted, navigate]
    )

    return { isUpvoted, upvoteCount, handleUpvoteClick }
}

export default useUpvote
