import React, { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.user);
      } catch (error) {
        console.error("Error loading profile:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm text-slate-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <span className="text-xl text-red-500">!</span>
          </div>

          <h2 className="text-lg font-semibold text-slate-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">
          Profile not found.
        </p>
      </div>
    );
  }

  const fullName = `${profile.firstName || ""} ${
    profile.lastName || ""
  }`.trim();

  const initials = `${profile.firstName?.[0] || ""}${
    profile.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your professional profile and job preferences.
          </p>
        </div>

        {/* PROFILE HEADER */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 sm:h-40" />

          <div className="px-5 pb-6 sm:px-8">

            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

              {/* User Info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                {/* Avatar */}
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={fullName}
                    className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md sm:h-28 sm:w-28"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-slate-900 text-2xl font-bold text-white shadow-md sm:h-28 sm:w-28">
                    {initials || "U"}
                  </div>
                )}

                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {fullName || "Your Name"}
                  </h2>

                  <p className="mt-1 text-base text-slate-600">
                    {profile.headline ||
                      profile.currentRole ||
                      "Add your professional headline"}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                    {profile.location && (
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        {profile.location}
                      </span>
                    )}

                    <span className="flex items-center gap-1">
                      <span>💼</span>
                      {profile.experience || 0} years experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <button
                type="button"
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* LEFT COLUMN */}
          <div className="space-y-6 lg:col-span-2">

            {/* ABOUT */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  About
                </h3>
              </div>

              <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                {profile.bio ||
                  "Tell recruiters about yourself, your experience, and what you are looking for."}
              </p>
            </section>

            {/* PROFESSIONAL INFORMATION */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <InfoItem
                  label="Current Role"
                  value={profile.currentRole}
                />

                <InfoItem
                  label="Current Company"
                  value={profile.currentCompany}
                />

                <InfoItem
                  label="Experience"
                  value={
                    profile.experience !== undefined
                      ? `${profile.experience} years`
                      : null
                  }
                />

                <InfoItem
                  label="Phone"
                  value={profile.phone}
                />
              </div>
            </section>

            {/* SKILLS */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Skills
              </h3>

              {profile.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No skills added yet.
                </p>
              )}
            </section>

            {/* EDUCATION */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Education
              </h3>

              {profile.education?.length > 0 ? (
                <div className="space-y-5">
                  {profile.education.map((education, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-slate-200 pl-4"
                    >
                      <h4 className="font-semibold text-slate-900">
                        {education.degree || "Degree not specified"}
                      </h4>

                      <p className="mt-1 text-sm text-slate-600">
                        {education.institution ||
                          "Institution not specified"}
                      </p>

                      {education.fieldOfStudy && (
                        <p className="mt-1 text-sm text-slate-500">
                          {education.fieldOfStudy}
                        </p>
                      )}

                      {(education.startYear ||
                        education.endYear) && (
                        <p className="mt-2 text-xs text-slate-400">
                          {education.startYear || "----"}{" "}
                          -{" "}
                          {education.endYear || "Present"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No education details added yet.
                </p>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* JOB PREFERENCES */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Job Preferences
              </h3>

              <div className="space-y-5">

                <PreferenceItem
                  label="Preferred Roles"
                  values={profile.preferredRoles}
                />

                <PreferenceItem
                  label="Preferred Locations"
                  values={profile.preferredLocations}
                />

                <PreferenceItem
                  label="Work Mode"
                  values={profile.workMode}
                />

                <PreferenceItem
                  label="Employment Type"
                  values={profile.employmentType}
                />

                <InfoItem
                  label="Expected Salary"
                  value={
                    profile.expectedSalary
                      ? `₹${profile.expectedSalary.toLocaleString()} / year`
                      : null
                  }
                />

                <InfoItem
                  label="Notice Period"
                  value={profile.noticePeriod}
                />
              </div>
            </section>

            {/* SOCIAL LINKS */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-semibold text-slate-900">
                Social & Professional Links
              </h3>

              <div className="space-y-4">

                <SocialLink
                  label="LinkedIn"
                  value={profile.linkedin}
                />

                <SocialLink
                  label="GitHub"
                  value={profile.github}
                />

                <SocialLink
                  label="Portfolio"
                  value={profile.portfolio}
                />
              </div>
            </section>

            {/* CONTACT */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Contact
              </h3>

              <div className="space-y-3">
                <InfoItem
                  label="Email"
                  value={profile.email}
                />

                <InfoItem
                  label="Phone"
                  value={profile.phone}
                />

                <InfoItem
                  label="Location"
                  value={profile.location}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};


/* -------------------------------- */
/* REUSABLE COMPONENTS              */
/* -------------------------------- */

const InfoItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-800">
        {value || "Not specified"}
      </p>
    </div>
  );
};


const PreferenceItem = ({ label, values }) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      {values?.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {value}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-1 text-sm text-slate-500">
          Not specified
        </p>
      )}
    </div>
  );
};


const SocialLink = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 block truncate text-sm font-medium text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm text-slate-500">
          Not added
        </p>
      )}
    </div>
  );
};


export default Profile;