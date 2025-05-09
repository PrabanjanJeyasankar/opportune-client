import {
    fetchMoreProjectsFailure,
    fetchMoreProjectsStart,
    fetchMoreProjectsSuccess,
    fetchInitialProjectsFailure,
    fetchInitialProjectsStarts,
    fetchInitialProjectsSuccess,
} from './projectsSlice'
import * as projectsAPI from './projectsAPI'

/**
 * @async
 * @function fetchInitialProjects
 * @description Fetches the first page of projects and initializes the store
 * @returns {Function} Redux thunk function
 * @throws {Error} If API request fails
 */
export const fetchInitialProjects = () => async (dispatch, getState) => {
    const {
        projects: { page, limit, loading },
        tags: { selectedTag },
    } = getState()

    // Prevent duplicate initial loads
    if (loading) return

    dispatch(fetchInitialProjectsStarts())
    try {
        const response = await projectsAPI.fetchProjectsAPI(
            page,
            limit,
            selectedTag
        )
        dispatch(fetchInitialProjectsSuccess(response.data.data))
    } catch (error) {
        dispatch(fetchInitialProjectsFailure(error.message))
    }
}

/**
 * @async
 * @function fetchMoreProjects
 * @description Fetches subsequent pages of projects and appends to existing list
 * @returns {Function} Redux thunk function
 * @throws {Error} If API request fails
 */
export const fetchMoreProjects = () => async (dispatch, getState) => {
    const {
        projects: { page, limit, fetchingMore, hasMore },
        tags: { selectedTag },
    } = getState()

    // Prevent duplicate requests or fetching when no more data
    if (fetchingMore || !hasMore) return

    dispatch(fetchMoreProjectsStart())

    try {
        const response = await projectsAPI.fetchProjectsAPI(
            page,
            limit,
            selectedTag
        )
        
        /**
         * @typedef {Object} APIResponse
         * @property {Array} data - Array of project objects
         * @property {boolean} hasNextPage - Pagination flag
         */
        const responseData = response.data

        // Handle empty response edge case
        if (!responseData.data || responseData.data.length === 0) {
            return dispatch(
                fetchMoreProjectsSuccess({
                    projects: [],
                    hasNextPage: false,
                })
            )
        }

        dispatch(fetchMoreProjectsSuccess(response.data.data))
    } catch (error) {
        dispatch(fetchMoreProjectsFailure(error.message))
    }
}