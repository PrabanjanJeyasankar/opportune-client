import axiosInstance from "../utils/axiosInstance"

const postProjectService ={
    postProjectData: async (formData) => {
        const response = await axiosInstance.post("/project", formData);
        return response;
    },

    tagSelectionGetMethod: async (term) => {
        const response = await axiosInstance.get("/project/tag",{params: { keyword: term }})
        return response
    }
    
}

export default postProjectService