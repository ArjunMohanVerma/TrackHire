const normalizeJob = (job) => {
  return {
    id: job.id,
    title: job.title || "Untitled Job",
    company: job.company || "Unknown Company",
    location: job.location || "Location not specified",
    salary: job.salary || "Salary not specified",
    type: job.type || "Not specified",
    url: job.link,
    source: job.source || "Jooble",
    postedAt: job.updated || null,
    description: job.snippet || "",
  };
};

module.exports = normalizeJob;