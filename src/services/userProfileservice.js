import axiosInstance from '../utils/axiosInstance'

const userProfileService = {
    getUserProfile: async () => {
        const response = await axiosInstance.get('/user/profile')
        return response
    },

    updateProfile: async (formData) => {
        const response = await axiosInstance.patch('/user/profile', formData)
        return response
    },

    retirevePortfolioDataByUsername: async (username) => {
        const response = await axiosInstance.get(
            `/user/portfolio/${username}`
        )
        return response
    },
}

export default userProfileService
