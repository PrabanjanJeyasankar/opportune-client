import axiosInstance from "../utils/axiosInstance";

const userProfileService = {

    updateProfile: async (formData) => {
        try {
          const response = await axiosInstance.patch("/user/profile", formData);
          return response;
        } catch (error) {
          throw error;
        }
      }
    };

    export default userProfileService;