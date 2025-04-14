import axiosInstance from '@/utils/axiosInstance'

/**
 * @async
 * @function fetchProjectsAPI
 * @description Fetches paginated projects from the API with optional tag filtering.
 * @param {number} page - Current page number for pagination (1-based index)
 * @param {number} limit - Number of items to return per page
 * @param {string} tag - The selected tag to filter projects. If 'All', no filtering is applied.
 * @param {string} searchTerm - The term to search projects by. If empty, no search filtering is applied.
 * @returns {Promise<AxiosResponse>} Axios promise resolving to API response
 * @throws {Error} Will throw if network error occurs or invalid parameters provided
 */
export const fetchProjectsAPI = (page, limit, tag, searchTerm) => {
    return axiosInstance.get(
        `/project/home?tag=${
            tag === 'All' ? '' : tag
        }&page=${page}&limit=${limit}&search=${searchTerm}`
    )
}
