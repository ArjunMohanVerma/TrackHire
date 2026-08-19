import axiosInstance from "./axiosInstance";

//create a application
export const createApplication = async (applicationData) => {
  const response = await axiosInstance.post(
    "/application/createapplication",
    applicationData
  );

  return response.data;
};

//get all applicatin for logged in user
export const getApplications = async(req, res ) => {
    const response = await axiosInstance.get("/application/getapplications");
    return response.data;
}

// Get a single application by ID
export const getApplicationById = async (id) => {
  const response = await axiosInstance.get(
    `/application/getapplicationbyid/${id}`
  );

  return response.data;
};

// Update an application
export const updateApplication = async (id, applicationData) => {
  const response = await axiosInstance.patch(
    `/application/updateapplication/${id}`,
    applicationData
  );

  return response.data;
};

// Delete an application
export const deleteApplication = async (id) => {
  const response = await axiosInstance.delete(
    `/application/deleteapplication/${id}`
  );

  return response.data;
};