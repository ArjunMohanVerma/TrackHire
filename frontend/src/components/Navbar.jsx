import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import img from "../../public/ImgLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  // Desktop navigation styling
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "px-4 py-2 rounded-lg bg-teal-500 text-white font-medium"
      : "px-4 py-2 text-slate-700 font-medium hover:text-teal-600 transition duration-200";

  // Mobile navigation styling
  const mobileNavLinkClass = ({ isActive }) =>
    isActive
      ? "block w-full px-4 py-3 rounded-lg bg-teal-500 text-white font-medium text-center"
      : "block w-full px-4 py-3 rounded-lg text-slate-700 font-medium hover:bg-teal-50 hover:text-teal-600 text-center transition duration-200";

  return (
    <>
      {/* Navbar */}
      <div className="h-20 flex items-center justify-between px-4 sm:px-6 lg:px-10 text-[16px] font-bold font-sans bg-slate-200">
        {/* Logo */}
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          <img
            src={img}
            alt="TrackHire"
            className="w-auto h-16 object-contain"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-4 items-center">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
          </li>

          {user && (
            <li>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/applications" className={navLinkClass}>
              My Applications
            </NavLink>
          </li>

          <li>
            <NavLink to="/jobs" className={navLinkClass}>
              Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/analytics" className={navLinkClass}>
              Analytics
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>

          {user?<button
            onClick={handleLogout}
            className="px-4 py-2 text-slate-700 font-medium hover:text-red-600 transition duration-200"
          >
            Logout
          </button>:
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
          }
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative w-10 h-10 text-slate-700 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`absolute left-1/2 top-1/2 w-7 h-1 bg-slate-700 rounded transition-all duration-300 ease-in-out -translate-x-1/2 ${
              isOpen ? "rotate-45" : "-translate-y-2"
            }`}
          ></span>

          <span
            className={`absolute left-1/2 top-1/2 w-7 h-1 bg-slate-700 rounded transition-all duration-300 ease-in-out -translate-x-1/2 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>

          <span
            className={`absolute left-1/2 top-1/2 w-7 h-1 bg-slate-700 rounded transition-all duration-300 ease-in-out -translate-x-1/2 ${
              isOpen ? "-rotate-45" : "translate-y-2"
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <ul
        className={`
          lg:hidden
          flex flex-col gap-3
          px-6
          bg-white
          border-t border-slate-300
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-150 opacity-100 py-5" : "max-h-0 opacity-0 py-0"}
        `}
      >
        <li>
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            Home
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass}
            >
              Dashboard
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/applications"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            My Applications
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/jobs"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            Jobs
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            Analytics
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            className={mobileNavLinkClass}
          >
            Profile
          </NavLink>
        </li>

        {user?<button
            onClick={handleLogout}
            className="px-4 py-2 text-slate-700 font-medium hover:text-red-600 transition duration-200"
          >
            Logout
          </button>:
          <NavLink to="/login" className={mobileNavLinkClass}>
            Login
          </NavLink>
          }
      </ul>
    </>
  );
};

export default Navbar;
