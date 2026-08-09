import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signup({
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Signup successful:", user);

      // Go to dashboard after successful signup
      navigate("/dashboard");

    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Signup Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-5">
              <span className="text-2xl">🚀</span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Create Your Account
            </h1>

            <p className="mt-2 text-slate-500">
              Start organizing your job search with TrackHire.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
              </div>

            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />

              <p className="mt-2 text-xs text-slate-400">
                Password must be at least 8 characters.
              </p>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 active:bg-teal-800 transition duration-200 shadow-sm"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <div className="mt-7 pt-6 border-t border-slate-200 text-center">

            <p className="text-sm text-slate-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-teal-600 hover:text-teal-700"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

        {/* Bottom Text */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Track your applications. Find your next opportunity.
        </p>

      </div>

    </div>
  );
};

export default Signup;