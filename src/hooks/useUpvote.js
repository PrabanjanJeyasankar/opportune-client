import { toast } from '@/hooks/use-toast'
import useUserContext from '@/hooks/useUserContext'
import projectService from '@/services/projectService'
import handleUpvoteError from '@/utils/handleUpvoteError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function useUpvote(project) {
    const [isUpvoted, setIsUpvoted] = useState(project.isUpvotedByUser || false)
    const [upvoteCount, setUpvoteCount] = useState(project.upvoteCount || 0)
    const navigate = useNavigate()
    const { isUserLoggedIn } = useUserContext()
    const queryClient = useQueryClient()

    useEffect(() => {
        setIsUpvoted(project.isUpvotedByUser || false)
        setUpvoteCount(project.upvoteCount || 0)
    }, [project.isUpvotedByUser, project.upvoteCount])

    const upvoteMutation = useMutation({
        mutationFn: (newUpvoteState) =>
            newUpvoteState
                ? projectService.upvoteProject(project.slug)
                : projectService.deleteUpvoteProject(project.slug),
        onMutate: async (newUpvoteState) => {
            setIsUpvoted(newUpvoteState)
            setUpvoteCount((prev) =>
                newUpvoteState ? prev + 1 : Math.max(prev - 1, 0)
            )

            await queryClient.cancelQueries(['homeFeedProjects'])

            return { previousUpvoteState: !newUpvoteState }
        },
        onError: (error, newUpvoteState, context) => {
            setIsUpvoted(context.previousUpvoteState)
            setUpvoteCount((prev) =>
                newUpvoteState ? Math.max(prev - 1, 0) : prev + 1
            )
            handleUpvoteError(error, navigate)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['homeFeedProjects'])
        },
    })

    const handleUpvoteClick = useCallback(
        (e) => {
            e.stopPropagation()

            if (!isUserLoggedIn) {
                toast({ description: 'Please login to upvote.' })
                navigate('/login')
                return
            }

            upvoteMutation.mutate(!isUpvoted)
        },
        [isUserLoggedIn, isUpvoted, navigate, upvoteMutation]
    )

    return { isUpvoted, upvoteCount, handleUpvoteClick }
}

export default useUpvote
