import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
    try{
        const response = await axiosInstance.get('/profile');
        return response.data;

    }catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
}

export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.patch("/profile", profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadProfileImage = async (file) =>{
  const formData = new FormData();
  formData.append("profileImage", file);
  const response = await axiosInstance.post("/profile/image", formData)
  return response;
}