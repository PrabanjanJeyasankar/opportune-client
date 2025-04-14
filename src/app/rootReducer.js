import { combineReducers } from '@reduxjs/toolkit'

import projectReducer from '@/app/features/projects/projectsSlice'
import tagsReducer from '@/app/features/tags/tagsSlice'

/**
 * Root reducer that combines all feature reducers into a single reducer function.
 *
 * `combineReducers` is used to merge multiple slice reducers into one,
 * which can then be passed to the Redux store.
 *
 * @typedef {Object} RootState
 * @property {import('@/app/features/projects/projectsSlice').ProjectState} projects - State managed by the project reducer.
 * @property {import('@/app/features/tags/tagsSlice').TagsState} tags - State managed by the tags reducer.
 *
 * @returns {Function} - The combined reducer function.
 */
const rootReducer = combineReducers({
    projects: projectReducer,
    tags: tagsReducer,
})

export default rootReducer
