import axiosInstance from '../utils/axiosInstance'

const projectService = {
    postProjectData: async (formData) => {
        const response = await axiosInstance.post('/project', formData)
        return response
    },

    tagSelectionGetMethod: async (term) => {
        const response = await axiosInstance.get('/project/tag', {
            params: { keyword: term },
        })
        return response
    },
    upvoteProject: async (projectSlug) => {
        const response = await axiosInstance.post(
            `/project/${projectSlug}/upvote`
        )
        return response
    },

    deleteUpvoteProject: async (projectSlug) => {
        const response = await axiosInstance.delete(
            `/project/${projectSlug}/upvote`
        )
        return response
    },

    retrieveAllProjectByUsername: async (username) => {
        const response = await axiosInstance.get(`/project/${username}`)
        return response
    },

    retrieveProjectBySlug: async (username, slug) => {
        const response = await axiosInstance.get(`/project/${username}/${slug}`)
        return response
    },

    editProjectBySlug: async (slug, formData) => {
        console.log('hii' + slug)
        const response = await axiosInstance.patch(`/project/${slug}`, formData)
        return response
    },
}

export default projectService
