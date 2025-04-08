import { createSlice } from '@reduxjs/toolkit'

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
 */
const initialState = {
    projects: [],
    error: null,
    loading: false,
    fetchingMore: false,
    hasMore: true,
    page: 1,
    limit: 12,
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
         * Action to indicate the start of fetching projects.
         * Sets the loading state to true.
         * @param {ProjectState} state - Current state of the project slice.
         */
        fetchInitialProjectsStarts: (state) => {
            state.loading = true
        },

        /**
         * Action to handle the success of fetching projects.
         * Updates the state with fetched projects, page information, and availability of more projects.
         * @param {ProjectState} state - Current state of the project slice.
         * @param {Object} action - Redux action object.
         * @param {Object} action.payload - Data payload containing projects and pagination info.
         * @param {Array} action.payload.projects - List of fetched projects.
         * @param {boolean} action.payload.hasNextPage - Indicates if there are more projects to fetch.
         */
        fetchInitialProjectsSuccess: (state, action) => {
            state.loading = false
            state.projects = action.payload.projects
            state.hasMore = action.payload.hasNextPage
        },

        /**
         * Action to handle errors during project fetch.
         * Updates the state with the error message.
         * @param {ProjectState} state - Current state of the project slice.
         * @param {Object} action - Redux action object.
         * @param {string} action.payload - Error message.
         */
        fetchInitialProjectsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        /**
         * Action to indicate the start of fetching more projects.
         * Clears previous errors and sets fetchingMore to true.
         * @param {ProjectState} state - Current state of the project slice.
         */
        fetchMoreProjectsStart: (state) => {
            state.fetchingMore = true
            state.error = null
            state.page = state.page + 1
        },

        /**
         * Action to handle successful fetching of more projects.
         * Appends newly fetched projects to the existing list and updates pagination info.
         * @param {ProjectState} state - Current state of the project slice.
         * @param {Object} action - Redux action object.
         * @param {Object} action.payload - Data payload containing projects and pagination info.
         * @param {Array} action.payload.projects - List of fetched projects.
         * @param {boolean} action.payload.hasNextPage - Indicates if there are more projects to fetch.
         */
        fetchMoreProjectsSuccess: (state, action) => {
            state.fetchingMore = false
            state.projects = [...state.projects, ...action.payload.projects]
            state.hasMore = action.payload.hasNextPage
        },

        /**
         * Action to handle errors during the fetch of more projects.
         * Updates the state with the error message and stops fetching.
         * @param {ProjectState} state - Current state of the project slice.
         * @param {Object} action - Redux action object.
         * @param {string} action.payload - Error message.
         */
        fetchMoreProjectsFailure: (state, action) => {
            state.fetchingMore = false
            state.error = action.payload
        }
    },
})

// Exporting actions for external use
export const {
    fetchInitialProjectsStarts,
    fetchInitialProjectsSuccess,
    fetchInitialProjectsFailure,
    fetchMoreProjectsStart,
    fetchMoreProjectsSuccess,
    fetchMoreProjectsFailure
} = projectSlice.actions

// Exporting reducer for store integration
export default projectSlice.reducer
