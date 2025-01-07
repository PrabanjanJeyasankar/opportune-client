import axiosInstance from "../utils/axiosInstance"

const authService = {
    login: async ({email, password}) => {
        const response = await axiosInstance.post("/auth/login", {email, password})
        return response
    },

    signup: async (userData) => {
        const response = await axiosInstance.post("/auth/signup", userData)
        return response
    },

    verfiyOtp: async({email, otp}) => {
        const response = await axiosInstance.post("/auth/verifyOtp", {email, otp})
        return response
    },

    resendOtp: async(email) => {
        const response = await axiosInstance.post("/auth/resendOtp", {email})
        return response
    },

    checkUserName: async(username) => {
        const response = await axiosInstance.post("/user/checkUsername", {username})
        return response
    } ,

    logout: async () => {
        const response = await axiosInstance.post("/auth/logout")
        return response
    },
    
} 

export default authService