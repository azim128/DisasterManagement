import { Calendar, FileText, Settings, Users } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./Layout/ DashboardLayout";
import Layout from "./Layout/Layout";

import VolunteersManagementPage from "./pages/Admin/VolunteersManagementPage";

import PublicLayout from "./Layout/PublicLayout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import AboutPage from "./pages/Public/AboutPage";
import ContactPage from "./pages/Public/ContactPage";

import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import CrisesManagementPage from "./pages/Admin/CrisesManagementPage";
import FeedBacksPage from "./pages/Admin/FeedBacksPage";
import ReportsManagementPage from "./pages/Admin/ReportsManagementPage";
import SettingPage from "./pages/Admin/SettingPage";
import HomePage from "./pages/Public/HomePage";
import NotAuthorized from "./pages/Public/NotAuthorized";
import NotFoundPage from "./pages/Public/NotFoundPage";
import TasksPage from "./pages/Volunteer/TasksPage";
import VolunteerPage from "./pages/Volunteer/VolunteerPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DonationPage from "./pages/Public/DonationPage";
const adminItems = [
  { path: "/admin/settings", label: "Settings", icon: Settings },
  { path: "/admin/volunteers", label: "Volunteers", icon: Users },
  { path: "/admin/reports", label: "Reports", icon: FileText },
  { path: "/admin/crises", label: "Crises", icon: Calendar },
  { path: "/admin/feedbacks", label: "Feedbacks", icon: FileText },
];

const volunteerItems = [
  { path: "/volunteer/tasks", label: "Tasks", icon: FileText },
  { path: "/volunteer", label: "Schedule", icon: Calendar },
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/make-donation" element={<DonationPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/not-authorized" element={<NotAuthorized />} />
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
              <Route
                path="/admin"
                element={<DashboardLayout navItems={adminItems} />}
              >
                <Route path="" element={<AdminDashboardPage />} />
                <Route
                  path="/admin/volunteers"
                  element={<VolunteersManagementPage />}
                />
                <Route
                  path="/admin/reports"
                  element={<ReportsManagementPage />}
                />
                <Route
                  path="/admin/crises"
                  element={<CrisesManagementPage />}
                />
                <Route path="/admin/feedbacks" element={<FeedBacksPage />} />
                <Route path="/admin/settings" element={<SettingPage />} />
              </Route>
            </Route>

            {/* Volunteer routes */}
            <Route element={<ProtectedRoute requiredRole="VOLUNTEER" />}>
              <Route
                path="/volunteer"
                element={<DashboardLayout navItems={volunteerItems} />}
              >
                <Route path="" element={<VolunteerPage />} />
                <Route path="/volunteer/tasks" element={<TasksPage />} />
              </Route>
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
