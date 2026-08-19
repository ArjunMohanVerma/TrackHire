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

const normalizeJobType = (type) => {
  if (!type) return "Full Time";

  const value = type.toLowerCase().trim();

  if (value === "full-time" || value === "full time") {
    return "Full Time";
  }

  if (value === "part-time" || value === "part time") {
    return "Part Time";
  }

  if (value === "contract") {
    return "Contract";
  }

  return type;
};


const normalizeJob = (job) => {
  return {
    externalId: job.id ? String(job.id) : "",

    title: job.title || "Untitled Job",

    company: job.company || "Unknown Company",

    location: job.location || "Location not specified",

    jobType: normalizeJobType(job.type),

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