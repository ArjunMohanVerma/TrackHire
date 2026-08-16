const getWorkMode = (job) => {
  const text = `${job.title || ""} ${job.snippet || ""}`.toLowerCase();

  if (text.includes("remote")) {
    return "Remote";
  }

  if (text.includes("hybrid")) {
    return "Hybrid";
  }

  return "Onsite";
};


const normalizeJob = (job) => {
  return {
    externalId: job.id ? String(job.id) : "",

    title: job.title || "Untitled Job",

    company: job.company || "Unknown Company",

    location: job.location || "Location not specified",

    jobType: job.type || "Full Time",

    workMode: getWorkMode(job),

    salary:
      job.salary && !isNaN(Number(job.salary))
        ? Number(job.salary)
        : null,

    jobLink: job.link || "",

    source: job.source || "Jooble",

    description: job.snippet || "",

    postedAt: job.updated || null,
  };
};

module.exports = normalizeJob;