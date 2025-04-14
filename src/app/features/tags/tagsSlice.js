import { createSlice } from '@reduxjs/toolkit'
import { fetchTags } from './tagsThunks'

/**
 * Initial state for the tags slice.
 * @typedef {Object} TagsState
 * @property {Array<Object>} tags - List of tag objects.
 * @property {string} selectedTag - Currently selected tag used for filtering.
 * @property {boolean} loading - Indicates whether tag data is being fetched.
 * @property {string|null} error - Error message if an error occurs during fetch.
 */
const initialState = {
    tags: [],
    selectedTag: 'All',
    loading: false,
    error: null,
}

/**
 * Redux slice for managing tag-related state and actions.
 * Uses Redux Toolkit's `createSlice` for simplified state management.
 */
const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        /**
         * Action to update the selected tag.
         * @param {TagsState} state - Current state of the tags slice.
         * @param {Object} action - Redux action object.
         * @param {string} action.payload - The tag value to set as selected.
         */
        setSelectedTag: (state, action) => {
            state.selectedTag = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            /**
             * Handles the pending state for fetching tags.
             * Sets loading to true and clears any previous error.
             * @param {TagsState} state - Current state of the tags slice.
             */
            .addCase(fetchTags.pending, (state) => {
                state.loading = true
                state.error = null
            })

            /**
             * Handles the fulfilled state when tags are successfully fetched.
             * Prepends the default 'All' tag to the fetched list.
             * @param {TagsState} state - Current state of the tags slice.
             * @param {Object} action - Redux action object.
             * @param {Array<Object>} action.payload - Array of tag objects from the API.
             */
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.loading = false
                state.tags = [
                    { _id: '577cfd21dbd349db5aec6e3f', tag: 'All' },
                    ...action.payload,
                ]
            })

            /**
             * Handles the rejected state when fetching tags fails.
             * Sets the error message and stops loading.
             * @param {TagsState} state - Current state of the tags slice.
             * @param {Object} action - Redux action object containing error details.
             * @param {Object} action.error - Error object.
             * @param {string} action.error.message - Error message string.
             */
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

// Exporting actions for use in thunks/components
export const { setSelectedTag } = tagsSlice.actions

// Exporting reducer for store integration
export default tagsSlice.reducer
