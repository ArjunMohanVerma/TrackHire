import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* parent container */}
      <div className="bg-slate-900 text-white py-6 px-4 sm:px-8 text-center">
        {/* main footer */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-0">
          {/* div1 */}
          <div className="w-full md:w-3/12">
            <div className="border-b pb-4 border-white-100 text-xl hover:text-amber-300 transition duration-500">
              Navigate
            </div>
            <ul className="flex flex-col pt-4">
              <li className="m-auto cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/">Home</NavLink></li>
              <li className="m-auto pt-2 cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/login">Login</NavLink></li>
              <li className="m-auto pt-2  cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/jobs">Jobs</NavLink></li>
              <li className="m-auto pt-2 cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/">Policies</NavLink></li>
            </ul>
          </div>

          {/* div2 */}
          <div className="w-full md:w-6/12">
            <h2 className="mb-3 font-bold text-3xl hover:text-amber-300 transition duration-500">TrackHire</h2>

            <div className="mb-8">
              Organize your job search. Find your next opportunity.
            </div>
            <div className="flex gap-2 justify-center">
              <input
                type="email"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-5/12 px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder="Email"
                required
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </div>
            <div className="mt-6 text-[12px]">We Respect Your Privacy</div>
          </div>

          {/* div3 */}
          <div className="w-full md:w-3/12">
            <div>
              <div className="border-b pb-4 border-white-100 text-xl hover:text-amber-300 transition duration-500">
              For Job Seekers
            </div>

              <ul className="space-y-3">
                <li className="m-auto pt-2 cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/signup">Create Profile </NavLink></li>
                <li className="m-auto pt-2 cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/jobs">Browse Jobs</NavLink></li>
                <li className="m-auto pt-2 cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/">Career Resources</NavLink></li>
                <li className="m-auto pt-2 cursor-pointer hover:scale-105 transition duration-300"><NavLink to="/jobs">Job Alerts</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm sm:text-base"> © 2026 TrackHire. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
