import {
    fetchMoreProjectsFailure,
    fetchMoreProjectsStart,
    fetchMoreProjectsSuccess,
    fetchInitialProjectsFailure,
    fetchInitialProjectsStarts,
    fetchInitialProjectsSuccess,
} from './projectsSlice'
import * as projectsAPI from './projectsAPI'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
 * @async
 * @function fetchInitialProjects
 * @description Thunk action created with createAsyncThunk to fetch the first page of projects.
 * It initializes the Redux store with the fetched projects based on the current page, limit, tag, and searchTerm.
 * @returns {Promise<Object>} The payload containing the fetched project data.
 * @throws {Error} If the API request fails.
 */
export const fetchInitialProjects = createAsyncThunk(
    'projects/fetchInitialProjects',
    async (_, { getState }) => {
        const {
            projects: { page, limit, loading, searchTerm },
            tags: { selectedTag },
        } = getState()

        const response = await projectsAPI.fetchProjectsAPI(
            page,
            limit,
            selectedTag,
            searchTerm
        )
        return response.data.data
    }
)

/**
 * @async
 * @function fetchMoreProjects
 * @description Thunk action created with createAsyncThunk to fetch more projects (pagination).
 * Prevents duplicate fetches and stops fetching if there are no more projects to load.
 * @returns {Promise<Object|undefined>} The payload containing the additional project data or undefined if not fetched.
 * @throws {Error} If the API request fails.
 */
export const fetchMoreProjects = createAsyncThunk(
    'projects/fetchMoreProjects',
    async (_, { getState }) => {
        const {
            projects: { page, limit, fetchingMore, hasMore, searchTerm },
            tags: { selectedTag },
        } = getState()

        // Prevent duplicate requests or fetching when no more data
        if (fetchingMore || !hasMore) return

        const response = await projectsAPI.fetchProjectsAPI(
            page,
            limit,
            selectedTag,
            searchTerm
        )
        return response.data.data
    }
)
