import axiosInstance from './axiosInstance'

export const loginUser = async (data)=>{
    const response =  await axiosInstance.post("/auth/login", data);
    return response.data;
};

export const signupUser = async (data) => {

    const response =  await axiosInstance.post("/auth/signup", data);
    return response.data;
};

export const logoutUser = async () => {

    const response =  await axiosInstance.post("/auth/logout");
    return response.data;
};