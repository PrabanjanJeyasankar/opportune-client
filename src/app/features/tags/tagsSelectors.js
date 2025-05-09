/**
 * @function selectTags
 * @description Selects the array of available tags from the Redux store
 * @param {Object} state - The root Redux store state
 * @returns {Array<string>} List of tags used for filtering projects
 * @example
 * const tags = useSelector(selectTags)
 */
export const selectTags = (state) => state.tags.tags

/**
 * @function selectSelectedTag
 * @description Selects the currently selected tag for filtering projects
 * @param {Object} state - The root Redux store state
 * @returns {string} Currently selected tag value
 * @example
 * const selectedTag = useSelector(selectSelectedTag)
 */
export const selectSelectedTag = (state) => state.tags.selectedTag

/**
 * @function selectTagsLoading
 * @description Selects the loading state for tag fetching
 * @param {Object} state - The root Redux store state
 * @returns {boolean} True if tags are currently being fetched
 * @example
 * const isLoadingTags = useSelector(selectTagsLoading)
 */
export const selectTagsLoading = (state) => state.tags.loading

/**
 * @function selectTagsError
 * @description Selects the error state for tag fetching
 * @param {Object} state - The root Redux store state
 * @returns {string|null} Error message if tag fetching failed, otherwise null
 * @example
 * const tagError = useSelector(selectTagsError)
 */
export const selectTagsError = (state) => state.tags.error
