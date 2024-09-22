import { LogOut, Menu, X } from "lucide-react";
import PropsTypes from "prop-types";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium ${
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`
      }
      onClick={() => setIsMenuOpen(false)} // Close menu on item click (for mobile)
    >
      {children}
    </NavLink>
  );

  NavItem.propTypes = {
    to: PropsTypes.string.isRequired,
    children: PropsTypes.node.isRequired,
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                DisasterAction
              </Link>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/about">About</NavItem>
                <NavItem to="/contact">Contact</NavItem>
                {isAuthenticated && user?.role === "ADMIN" && (
                  <NavItem to="/admin">Dashboard</NavItem>
                )}
                {isAuthenticated && user?.role === "VOLUNTEER" && (
                  <NavItem to="/volunteers">Dashboard</NavItem>
                )}

                {isAuthenticated && (
                  <>
                  <NavItem to="/inventory">Inventory</NavItem>
                  <NavItem to="/account">Profile</NavItem></>
                )}
                {!isAuthenticated && (
                  <>
                  <NavItem to="volunteer">Volunteer</NavItem>
                  <NavItem to="crisis">Crisis</NavItem>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* User Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md hover:text-gray-400 text-white hover:bg-gray-700 focus:outline-none "
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`absolute md:hidden top-16 left-0 w-full h-[70vh] bg-gray-800 z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            {isAuthenticated && user?.role === "ADMIN" && (
              <NavItem to="/admin">Admin</NavItem>
            )}
            {isAuthenticated && user?.role === "VOLUNTEER" && (
              <NavItem to="/volunteer">Volunteer</NavItem>
            )}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
