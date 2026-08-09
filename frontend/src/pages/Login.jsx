import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login({
        email,
        password,
      });

      console.log("Logged in:", user);

      // Go to dashboard after successful login
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-5">
              <span className="text-2xl">👋</span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-500">
              Login to continue managing your job search.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

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
              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Forgot password?
                </Link>

              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 active:bg-teal-800 transition duration-200 shadow-sm"
            >
              Login
            </button>

          </form>

          {/* Signup */}
          <div className="mt-7 pt-6 border-t border-slate-200 text-center">

            <p className="text-sm text-slate-500">
              Don't have an account?{" "}

              <Link
                to="/signup"
                className="font-semibold text-teal-600 hover:text-teal-700"
              >
                Create one
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

export default Login;



// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await login({
//         email,
//         password,
//       });

//       console.log("Logged in:", user);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />

//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />

//       <button type="submit">
//         Login
//       </button>
//     </form>
//   );
// };

// export default Login;