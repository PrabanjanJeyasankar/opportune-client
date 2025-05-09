import axiosInstance from '@/utils/axiosInstance'

/**
 * @async
 * @function fetchTagsAPI
 * @description Fetches the list of all available tags from the API for filtering projects.
 * @returns {Promise<AxiosResponse>} Axios promise resolving to API response containing tag list
 * @throws {Error} Will throw if the network request fails
 */
export const fetchTagsAPI = () => {
    return axiosInstance.get(`/project/tags`)
}
