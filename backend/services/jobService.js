const axios = require("axios");
const normalizeJob = require("../utils/normalizeJob");

const searchLiveJobs = async ({
  keyword,
  location,
  page = 1,
}) => {
  try {
    const response = await axios.post(
      `https://jooble.org/api/${process.env.JOOBLE_API_KEY}`,
      {
        keywords: keyword,
        location: location,
        page,
        ResultOnPage: 20,
      }
    );

    const jobs = response.data.jobs || [];

    return jobs.map(normalizeJob);

  } catch (error) {
    console.error("Error searching live jobs:", error.message);

    throw error; // ⭐ IMPORTANT
  }
};

module.exports = searchLiveJobs;