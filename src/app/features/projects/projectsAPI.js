import axiosInstance from "@/utils/axiosInstance"

/**
 * @async
 * @function fetchProjectsAPI
 * @description Fetches paginated projects from the API
 * @param {number} page - Current page number for pagination (1-based index)
 * @param {number} limit - Number of items to return per page
 * @returns {Promise<AxiosResponse>} Axios promise resolving to API response
 * @throws {Error} Will throw if network error occurs or invalid parameters provided
 */
export const fetchProjectsAPI = (page, limit) => {
    return axiosInstance.get(`/project/home?page=${page}&limit=${limit}`)
}