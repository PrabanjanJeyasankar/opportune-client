import axiosInstance from '@/utils/axiosInstance'

const fetchMoreProjectsByUser = (username, slug) => {
    return axiosInstance
        .get(`/project/${username}/${slug}/more`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            } else {
                throw new Error(
                    `Failed to fetch data. Status: ${response.status}`
                )
            }
        })
        .catch((error) => {
            console.error('Error fetching image data:', error)
            throw error
        })
}

export default fetchMoreProjectsByUser
