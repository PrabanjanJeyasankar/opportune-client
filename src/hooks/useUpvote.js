import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import projectService from '@/services/projectService'
import handleUpvoteError from '@/utils/handleUpvoteError'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function useUpvote(project) {
    const [isUpvoted, setIsUpvoted] = useState(project.isUserLiked || false)
    const [upvoteCount, setUpvoteCount] = useState(project.upvoteCount || 0)
    const navigate = useNavigate()
    const { isUserLoggedIn } = useUserContext()

    useEffect(() => {
        setIsUpvoted(project.isUserLiked || false)
        setUpvoteCount(project.upvoteCount || 0)
    }, [project.isUserLiked, project.upvoteCount])

    const handleUpvoteClick = useCallback(
        (e) => {
            e.stopPropagation()

            if (!isUserLoggedIn) {
                toast({ description: 'Please login to upvote.' })
                navigate('/login')
                return
            }

            const newUpvoteState = !isUpvoted
            setIsUpvoted(newUpvoteState)
            setUpvoteCount((prev) =>
                newUpvoteState ? prev + 1 : Math.max(prev - 1, 0)
            )

            const upvoteAction = newUpvoteState
                ? projectService.upvoteProject(project.slug)
                : projectService.deleteUpvoteProject(project.slug)

            upvoteAction.catch((error) => {
                setIsUpvoted(!newUpvoteState) // Revert state on error
                setUpvoteCount((prev) =>
                    newUpvoteState ? Math.max(prev - 1, 0) : prev + 1
                )
                handleUpvoteError(error, navigate)
            })
        },
        [isUpvoted, isUserLoggedIn, navigate, project.slug]
    )

    return { isUpvoted, upvoteCount, handleUpvoteClick }
}

export default useUpvote
