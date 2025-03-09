import axiosInstance from '../utils/axiosInstance'

const aboutusService = {
    fetchImages: async () => {
        const response = await axiosInstance.get('/aboutus/images')
        return response
    },
}

export default aboutusService
