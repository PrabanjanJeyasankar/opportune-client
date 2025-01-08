import axiosInstance from '../utils/axiosInstance'

const fetchProjectTags = async () => {
    try {
        const response = await axiosInstance.get('/project/tags')

        if (response.status === 200) {
            return response.data.data
        } else {
            console.error('Unexpected response status:', response.status)
            return []
        }
    } catch (error) {
        if (error.response) {
            console.error(
                'Error fetching all tags:',
                error.response.status,
                error.response.data
            )
            if (error.response.status === 500) {
                console.error('Internal Server Error. Please try again later.')
            }
        } else if (error.request) {
            console.error('No response received:', error.request)
        } else {
            console.error('Error:', error.message)
        }
        return []
    }
}

export default fetchProjectTags
