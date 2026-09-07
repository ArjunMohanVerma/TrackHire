import React, { useEffect, useState } from "react";
import { updateProfile } from "../services/profileService";

const EditProfileModal = ({ profile, onClose, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profileImage: "",
    phone: "",
    headline: "",
    bio: "",
    location: "",

    currentRole: "",
    currentCompany: "",
    experience: 0,
    skills: [],

    preferredRoles: [],
    preferredLocations: [],
    workMode: [],
    employmentType: [],
    expectedSalary: "",
    noticePeriod: "",

    education: [],

    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Populate form with existing profile
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        profileImage: profile.profileImage || "",
        phone: profile.phone || "",
        headline: profile.headline || "",
        bio: profile.bio || "",
        location: profile.location || "",

        currentRole: profile.currentRole || "",
        currentCompany: profile.currentCompany || "",
        experience: profile.experience ?? 0,
        skills: profile.skills || [],

        preferredRoles: profile.preferredRoles || [],
        preferredLocations: profile.preferredLocations || [],
        workMode: profile.workMode || [],
        employmentType: profile.employmentType || [],
        expectedSalary: profile.expectedSalary ?? "",
        noticePeriod: profile.noticePeriod || "",

        education: profile.education || [],

        linkedin: profile.linkedin || "",
        github: profile.github || "",
        portfolio: profile.portfolio || "",
      });
    }
  }, [profile]);

  // -----------------------------
  // NORMAL INPUT HANDLER
  // -----------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // ARRAY HELPERS
  // -----------------------------

  const addArrayItem = (field, value, clearInput) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    if (formData[field].includes(trimmedValue)) {
      clearInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], trimmedValue],
    }));

    clearInput("");
  };

  const removeArrayItem = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  // -----------------------------
  // SKILLS
  // -----------------------------

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      addArrayItem(
        "skills",
        skillInput,
        setSkillInput
      );
    }
  };

  // -----------------------------
  // WORK MODE
  // -----------------------------

  const toggleWorkMode = (mode) => {
    setFormData((prev) => ({
      ...prev,
      workMode: prev.workMode.includes(mode)
        ? prev.workMode.filter((item) => item !== mode)
        : [...prev.workMode, mode],
    }));
  };

  // -----------------------------
  // EMPLOYMENT TYPE
  // -----------------------------

  const toggleEmploymentType = (type) => {
    setFormData((prev) => ({
      ...prev,
      employmentType: prev.employmentType.includes(type)
        ? prev.employmentType.filter((item) => item !== type)
        : [...prev.employmentType, type],
    }));
  };

  // -----------------------------
  // EDUCATION
  // -----------------------------

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          fieldOfStudy: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleEducationChange = (
    index,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((education, i) =>
        i === index
          ? {
              ...education,
              [field]: value,
            }
          : education
      ),
    }));
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const cleanedEducation = formData.education.map(
        (education) => ({
          ...education,
          startYear: education.startYear
            ? Number(education.startYear)
            : undefined,
          endYear: education.endYear
            ? Number(education.endYear)
            : undefined,
        })
      );

      const data = await updateProfile({
        ...formData,
        experience: Number(formData.experience),
        expectedSalary: formData.expectedSalary
          ? Number(formData.expectedSalary)
          : null,
        education: cleanedEducation,
      });

      onProfileUpdate(data.user);
      onClose();

    } catch (error) {
      console.error(
        "Error updating profile:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep your profile updated to get better job matches.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-6"
        >

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* ================= BASIC INFORMATION ================= */}

          <SectionTitle
            title="Basic Information"
            description="Your basic personal and profile information."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />

            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Delhi, India"
            />

            <div className="sm:col-span-2">
              <InputField
                label="Profile Image URL"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            <div className="sm:col-span-2">
              <InputField
                label="Headline"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="e.g. MERN Stack Developer"
              />
            </div>

            <div className="sm:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Bio
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                placeholder="Tell recruiters about yourself..."
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1 text-right text-xs text-slate-400">
                {formData.bio.length}/500
              </p>

            </div>
          </div>


          {/* ================= PROFESSIONAL ================= */}

          <div className="mt-10">

            <SectionTitle
              title="Professional Information"
              description="Tell recruiters about your professional experience."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <InputField
                label="Current Role"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
              />

              <InputField
                label="Current Company"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                placeholder="e.g. Accenture"
              />

              <InputField
                label="Experience (Years)"
                name="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={handleChange}
              />

            </div>

            {/* SKILLS */}

            <div className="mt-6">

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Skills
              </label>

              <div className="flex gap-2">

                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) =>
                    setSkillInput(e.target.value)
                  }
                  onKeyDown={handleSkillKeyDown}
                  placeholder="e.g. React"
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    addArrayItem(
                      "skills",
                      skillInput,
                      setSkillInput
                    )
                  }
                  className="rounded-lg bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Add
                </button>

              </div>

              <TagList
                values={formData.skills}
                onRemove={(value) =>
                  removeArrayItem("skills", value)
                }
              />

            </div>
          </div>


          {/* ================= JOB PREFERENCES ================= */}

          <div className="mt-10">

            <SectionTitle
              title="Job Preferences"
              description="Tell TrackHire what kind of opportunities you're looking for."
            />

            {/* PREFERRED ROLES */}

            <TagInput
              label="Preferred Roles"
              placeholder="e.g. MERN Developer"
              value={roleInput}
              setValue={setRoleInput}
              values={formData.preferredRoles}
              onAdd={() =>
                addArrayItem(
                  "preferredRoles",
                  roleInput,
                  setRoleInput
                )
              }
              onRemove={(value) =>
                removeArrayItem(
                  "preferredRoles",
                  value
                )
              }
            />

            {/* PREFERRED LOCATIONS */}

            <div className="mt-6">

              <TagInput
                label="Preferred Locations"
                placeholder="e.g. Bangalore"
                value={locationInput}
                setValue={setLocationInput}
                values={formData.preferredLocations}
                onAdd={() =>
                  addArrayItem(
                    "preferredLocations",
                    locationInput,
                    setLocationInput
                  )
                }
                onRemove={(value) =>
                  removeArrayItem(
                    "preferredLocations",
                    value
                  )
                }
              />

            </div>


            {/* WORK MODE */}

            <div className="mt-6">

              <label className="mb-3 block text-sm font-medium text-slate-700">
                Work Mode
              </label>

              <div className="flex flex-wrap gap-3">

                {[
                  "Remote",
                  "Hybrid",
                  "On-site",
                ].map((mode) => (
                  <CheckboxButton
                    key={mode}
                    label={mode}
                    checked={formData.workMode.includes(
                      mode
                    )}
                    onChange={() =>
                      toggleWorkMode(mode)
                    }
                  />
                ))}

              </div>
            </div>


            {/* EMPLOYMENT TYPE */}

            <div className="mt-6">

              <label className="mb-3 block text-sm font-medium text-slate-700">
                Employment Type
              </label>

              <div className="flex flex-wrap gap-3">

                {[
                  "Full-time",
                  "Part-time",
                  "Contract",
                  "Internship",
                ].map((type) => (
                  <CheckboxButton
                    key={type}
                    label={type}
                    checked={formData.employmentType.includes(
                      type
                    )}
                    onChange={() =>
                      toggleEmploymentType(type)
                    }
                  />
                ))}

              </div>
            </div>


            {/* SALARY + NOTICE */}

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <InputField
                label="Expected Salary (₹ / year)"
                name="expectedSalary"
                type="number"
                min="0"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g. 800000"
              />

              <InputField
                label="Notice Period"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                placeholder="e.g. 30 days"
              />

            </div>

          </div>


          {/* ================= EDUCATION ================= */}

          <div className="mt-10">

            <div className="flex items-start justify-between gap-4">

              <SectionTitle
                title="Education"
                description="Add your educational background."
              />

              <button
                type="button"
                onClick={addEducation}
                className="shrink-0 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
              >
                + Add Education
              </button>

            </div>

            {formData.education.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
                <p className="text-sm text-slate-500">
                  No education details added yet.
                </p>
              </div>
            )}

            <div className="space-y-5">

              {formData.education.map(
                (education, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >

                    <div className="mb-4 flex items-center justify-between">

                      <h4 className="font-medium text-slate-800">
                        Education {index + 1}
                      </h4>

                      <button
                        type="button"
                        onClick={() =>
                          removeEducation(index)
                        }
                        className="text-sm font-medium text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>

                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                      <InputField
                        label="Degree"
                        value={education.degree}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        placeholder="e.g. B.Tech"
                      />

                      <InputField
                        label="Institution"
                        value={education.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        placeholder="e.g. XYZ University"
                      />

                      <InputField
                        label="Field of Study"
                        value={education.fieldOfStudy}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "fieldOfStudy",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Computer Science"
                      />

                      <div className="grid grid-cols-2 gap-4">

                        <InputField
                          label="Start Year"
                          type="number"
                          value={education.startYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "startYear",
                              e.target.value
                            )
                          }
                        />

                        <InputField
                          label="End Year"
                          type="number"
                          value={education.endYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "endYear",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>
                  </div>
                )
              )}

            </div>
          </div>


          {/* ================= SOCIAL LINKS ================= */}

          <div className="mt-10">

            <SectionTitle
              title="Social & Professional Links"
              description="Add links that recruiters can use to learn more about you."
            />

            <div className="grid grid-cols-1 gap-5">

              <InputField
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />

              <InputField
                label="GitHub"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />

              <InputField
                label="Portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />

            </div>
          </div>


          {/* ================= FOOTER ================= */}

          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};


/* ================================================= */
/* REUSABLE COMPONENTS                              */
/* ================================================= */

const SectionTitle = ({
  title,
  description,
}) => {
  return (
    <div className="mb-5">
      <h3 className="text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
};


const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};


const TagInput = ({
  label,
  placeholder,
  value,
  setValue,
  values,
  onAdd,
  onRemove,
}) => {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="flex gap-2">

        <input
          type="text"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAdd();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={onAdd}
          className="rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Add
        </button>

      </div>

      <TagList
        values={values}
        onRemove={onRemove}
      />

    </div>
  );
};


const TagList = ({
  values,
  onRemove,
}) => {
  if (!values?.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">

      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
        >
          {value}

          <button
            type="button"
            onClick={() => onRemove(value)}
            className="text-blue-500 transition hover:text-blue-800"
          >
            ×
          </button>
        </span>
      ))}

    </div>
  );
};


const CheckboxButton = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
        checked
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {checked ? "✓ " : ""}
      {label}
    </button>
  );
};


export default EditProfileModal;
