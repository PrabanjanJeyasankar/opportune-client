import axiosInstance from '../utils/axiosInstance'

const fetchHomeFeedProjectsService = async (
    limit = 12,
    page = 1,
    searchTerm = '',
    selectedTag = 'All'
) => {
    const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 12
    const validPage = Number.isInteger(page) && page > 0 ? page : 1

    try {
        const response = await axiosInstance.get('/project/home', {
            params: {
                limit: validLimit,
                page: validPage,
                search: searchTerm || undefined,
                tag: selectedTag !== 'All' ? selectedTag : undefined,
            },
        })

        if (response.status === 200) {
            return Array.isArray(response.data.data) ? response.data.data : []
        } else {
            console.error('Unexpected response status:', response.status)
            return []
        }
    } catch (error) {
        if (error.response) {
            console.error(
                'Error fetching home feed projects:',
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

export default fetchHomeFeedProjectsService
