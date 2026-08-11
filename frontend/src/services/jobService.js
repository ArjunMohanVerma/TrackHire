import axiosInstance from "./axiosInstance";

export const getAllLiveJobs = async ({
  keyword = "",
  location = "",
  page = 1,
} = {}) => {
    const response = await axiosInstance.get("/job/getlivejobs", {
        params: {
            keyword,
            location,
            page
        }
    });
    return response.data;
}