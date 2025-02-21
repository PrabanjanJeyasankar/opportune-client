import axiosInstance from '../utils/axiosInstance';

const fetchHomeFeedProjectsService = (limit = 10, page = 1) => {

    const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;
    const validPage = Number.isInteger(page) && page > 0 ? page : 1;
  
    return axiosInstance
      .get("/project/home", {
        params: {
          limit: validLimit, 
          page: validPage,  
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data.data;
        } else {
          console.error("Unexpected response status:", response.status);
          return [];
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error fetching home feed projects:",
            error.response.status,
            error.response.data
          );
          if (error.response.status === 500) {
            console.error("Internal Server Error. Please try again later.");
          }
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
        return [];
      });
  };
  

export default fetchHomeFeedProjectsService
