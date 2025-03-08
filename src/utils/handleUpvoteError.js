import { toast } from '@/hooks/use-toast'

function handleUpvoteError(error, navigate) {
    console.error('Upvote error:', error)

    if (error.response) {
        const status = error.response.status
        if (status === 401) {
            toast({
                description: 'Please login to upvote.',
            })
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
            description: 'Unexpected error. Please try again later.',
        })
    }
}

export default handleUpvoteError
