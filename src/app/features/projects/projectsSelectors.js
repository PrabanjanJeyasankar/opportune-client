/**
 * @function selectProjects
 * @description Selects the array of projects from the Redux store
 * @param {Object} state - The root Redux store state
 * @returns {Array<Object>} Current list of project objects
 * @example
 * const projects = useSelector(selectProjects)
 */
export const selectProjects = (state) => state.projects.projects

/**
 * @function selectProjectsError
 * @description Selects the current error state from projects slice
 * @param {Object} state - The root Redux store state
 * @returns {string|null} Current error message or null if no error
 * @example
 * const error = useSelector(selectProjectsError)
 */
export const selectProjectsError = (state) => state.projects.error

/**
 * @function selectProjectsLoading
 * @description Selects the initial loading state from projects slice
 * @param {Object} state - The root Redux store state
 * @returns {boolean} True if initial projects load is in progress
 * @example
 * const isLoading = useSelector(selectProjectsLoading)
 */
export const selectProjectsLoading = (state) => state.projects.loading

/**
 * @function selectProjectsFetchingMore
 * @description Selects the pagination loading state from projects slice
 * @param {Object} state - The root Redux store state
 * @returns {boolean} True if additional projects are being fetched
 * @example
 * const isFetchingMore = useSelector(selectProjectsFetchingMore)
 */
export const selectProjectsFetchingMore = (state) => state.projects.fetchingMore

/**
 * @function selectProjectsHasMore
 * @description Selects the pagination availability flag from projects slice
 * @param {Object} state - The root Redux store state
 * @returns {boolean} True if more projects are available for pagination
 * @example
 * const hasMoreProjects = useSelector(selectProjectsHasMore)
 */
export const selectProjectsHasMore = (state) => state.projects.hasMore

/**
 * @function selectProjectsPage
 * @description Selects the current pagination page number
 * @param {Object} state - The root Redux store state
 * @returns {number} Current page number (1-based index)
 * @example
 * const currentPage = useSelector(selectProjectsPage)
 */
export const selectProjectsPage = (state) => state.projects.page

/**
 * @function selectProjectsLimit
 * @description Selects the number of items per pagination page
 * @param {Object} state - The root Redux store state
 * @returns {number} Number of projects requested per page
 * @example
 * const pageLimit = useSelector(selectProjectsLimit)
 */
export const selectProjectsLimit = (state) => state.projects.limit

/**
 * @function selectProjectsSearchTerm
 * @description Selects the current search term from the projects slice
 * @param {Object} state - The root Redux store state
 * @returns {string} The current search term string
 * @example
 * const searchTerm = useSelector(selectProjectsSearchTerm)
 */
export const selectProjectsSearchTerm = (state) => state.projects.searchTerm
