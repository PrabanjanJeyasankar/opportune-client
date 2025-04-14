import { createAsyncThunk } from '@reduxjs/toolkit'
import * as tagsAPI from './tagsAPI'
import { setSelectedTag } from './tagsSlice'
import { fetchInitialProjects } from '../projects/projectsThunks'

/**
 * @async
 * @function fetchTags
 * @description Thunk to asynchronously fetch all available tags from the API and update the store.
 * Uses Redux Toolkit's createAsyncThunk for pending/fulfilled/rejected actions.
 *
 * @returns {Promise<Array<string>>} A promise that resolves to an array of tag strings.
 * @throws {Error} If the API request fails.
 */
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const response = await tagsAPI.fetchTagsAPI()
    return response.data.data
})

/**
 * @function handleTagSelection
 * @description Thunk for handling user tag selection.
 * If the same tag is clicked again, resets to "All" unless it's already "All".
 * Updates the selected tag in the store and re-fetches the projects accordingly.
 *
 * @param {string} tag - The tag selected by the user.
 * @returns {Function} A Redux thunk function.
 */
export const handleTagSelection = (tag) => (dispatch, getState) => {
    const {
        tags: { selectedTag },
    } = getState()

    if (tag === selectedTag) {
        if (tag === 'All') return
        dispatch(setSelectedTag('All'))
    } else {
        dispatch(setSelectedTag(tag))
    }

    dispatch(fetchInitialProjects())
}
