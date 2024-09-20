import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";

const DashboardLayout = ({ navItems }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-[89vh] bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-indigo-600 text-white">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          {isMobile && (
            <button onClick={toggleSidebar} className="lg:hidden">
              <X size={24} />
            </button>
          )}
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center py-3 px-4 rounded-lg transition-colors duration-200
                      ${
                        isActive
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    {Icon && <Icon size={20} className="mr-3" />}
                    <span>{item.label}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 md:hidden fixed top-0 left-0 w-full">
          <div className="flex items-center justify-between h-16 px-6">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
              >
                <Menu size={24} />
              </button>
            )}
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 ">
                <h2 className="text-2xl font-semibold text-gray-800 ">
                  {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
                </h2>

              </div>
              {/* You can add user profile, notifications, etc. here */}
            </div>
            <div>
              {/* add link for go to home page */}
              <Link to="/" className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800">
                Home
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

DashboardLayout.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};

export default DashboardLayout;