import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import projectService from '@/services/projectService'
import handleUpvoteError from '@/utils/handleUpvoteError'
import { useCallback, useEffect, useState } from 'react'

function useUpvote(project, navigate) {
    const [isUpvoted, setIsUpvoted] = useState(project.isUserLiked || false)
    const [upvoteCount, setUpvoteCount] = useState(project.upvoteCount || 0)

    const { isUserLoggedIn } = useUserContext()

    useEffect(() => {
        setIsUpvoted(project.isUserLiked || false)
        setUpvoteCount(project.upvoteCount || 0)
    }, [project.isUserLiked, project.upvoteCount])

    function handleCardClick() {
        navigate(`/${project.authorDetails.username}/${project.slug}`, {
            state: { project },
        })
    }

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

    return { isUpvoted, upvoteCount, handleCardClick, handleUpvoteClick }
}

export default useUpvote
