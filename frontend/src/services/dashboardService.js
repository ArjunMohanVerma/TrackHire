import axiosInstance from "./axiosInstance";

export const getDashboard = async () => {
  try {
    const response = await axiosInstance.get("/dashboard");

    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    throw error;
  }
};