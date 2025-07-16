import { createSlice } from '@reduxjs/toolkit'
import { fetchInitialProjects, fetchMoreProjects } from './projectsThunks'

/**
 * Initial state for the project slice.
 * @typedef {Object} ProjectState
 * @property {Array} projects - List of projects.
 * @property {string|null} error - Error message if an error occurs.
 * @property {boolean} loading - Indicates whether projects are being fetched.
 * @property {boolean} fetchingMore - Indicates whether additional projects are being fetched.
 * @property {boolean} hasMore - Flag to check if more projects are available for pagination.
 * @property {number} page - Current page number for pagination.
 * @property {number} limit - Number of projects to fetch per page.
 * @property {string} searchTerm - Term that is used to filter the projects.
 */
const initialState = {
    projects: [],
    error: null,
    loading: false,
    fetchingMore: false,
    hasMore: true,
    page: 1,
    limit: 12,
    searchTerm: '',
}

/**
 * Redux slice for managing project-related state and actions.
 * Uses Redux Toolkit's `createSlice` for simplified state management.
 */
const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        /**
         * Updates the search term used for filtering projects.
         * Also resets the pagination to the first page and clears the current list.
         * @param {ProjectState} state - Current project slice state.
         * @param {Object} action - Redux action.
         * @param {string} action.payload - New search term entered by the user.
         */
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
            state.page = 1
            state.list = []
        },
    },
    extraReducers: (builder) => {
        builder
            /**
             * Handles the pending state of fetchInitialProjects.
             * Indicates loading state for the first fetch.
             */
            .addCase(fetchInitialProjects.pending, (state) => {
                state.loading = true
            })

            /**
             * Handles successful fetching of the initial project list.
             * Updates the project list and pagination info.
             * @param {ProjectState} state
             * @param {Object} action
             * @param {Object} action.payload
             * @param {Array<Object>} action.payload.projects - Fetched project list.
             * @param {boolean} action.payload.hasNextPage - If there are more projects to load.
             */
            .addCase(fetchInitialProjects.fulfilled, (state, action) => {
                state.loading = false
                state.projects = action.payload.projects
                state.hasMore = action.payload.hasNextPage
            })

            /**
             * Handles failure of the initial fetch.
             * @param {ProjectState} state
             * @param {Object} action
             * @param {string} action.payload - Error message.
             */
            .addCase(fetchInitialProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            /**
             * Handles the pending state of fetchMoreProjects (pagination).
             * Increments the page and sets fetchingMore flag.
             */
            .addCase(fetchMoreProjects.pending, (state) => {
                state.fetchingMore = true
                state.error = null
                state.page = state.page + 1
            })

            /**
             * Handles successful loading of additional projects.
             * Appends the new projects to the current list.
             * @param {ProjectState} state
             * @param {Object} action
             * @param {Object} action.payload
             * @param {Array<Object>} action.payload.projects - Fetched additional projects.
             * @param {boolean} action.payload.hasNextPage - If more projects are still available.
             */
            .addCase(fetchMoreProjects.fulfilled, (state, action) => {
                state.fetchingMore = false
                state.projects = [...state.projects, ...action.payload.projects]
                state.hasMore = action.payload.hasNextPage
            })

            /**
             * Handles failure during pagination fetch.
             * @param {ProjectState} state
             * @param {Object} action
             * @param {string} action.payload - Error message.
             */
            .addCase(fetchMoreProjects.rejected, (state, action) => {
                state.fetchingMore = false
                state.error = action.payload
            })
    },
})

// Exporting actions for external use
export const {
    fetchInitialProjectsStarts,
    fetchInitialProjectsSuccess,
    fetchInitialProjectsFailure,
    fetchMoreProjectsStart,
    fetchMoreProjectsSuccess,
    fetchMoreProjectsFailure,
    setSearchTerm,
} = projectSlice.actions

// Exporting reducer for store integration
export default projectSlice.reducer
