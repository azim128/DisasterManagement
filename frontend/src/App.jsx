import {
  Boxes,
  Calendar,
  FileText,
  History,
  Settings,
  Users,
} from "lucide-react";
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
import AssignTaskPage from "./pages/Admin/AssignTaskPage";
import CrisesManagementPage from "./pages/Admin/CrisesManagementPage";
import InventoryManagementPage from "./pages/Admin/InventoryManagementPage";
import ReportsManagementPage from "./pages/Admin/ReportsManagementPage";
import SettingPage from "./pages/Admin/SettingPage";
import ProfilePage from "./pages/Auth/ProfilePage";
import InventoryPage from "./pages/common/InventoryPage";
import CrisisPage from "./pages/Public/CrisisPage";
import DonationPage from "./pages/Public/DonationPage";
import HomePage from "./pages/Public/HomePage";
import NotAuthorized from "./pages/Public/NotAuthorized";
import NotFoundPage from "./pages/Public/NotFoundPage";
import VolunteerPage from "./pages/Public/VolunteerPage";
import PurchaseHistoryPage from "./pages/Volunteer/PurchaseHistoryPage";
import StocksPage from "./pages/Volunteer/StocksPage";
import ProtectedRoute from "./routes/ProtectedRoute";
const adminItems = [
  { path: "/account", label: "Settings", icon: Settings },
  { path: "/admin/volunteers", label: "Volunteers", icon: Users },
  { path: "/admin/reports", label: "Reports", icon: FileText },
  { path: "/admin/crises", label: "Crises", icon: Calendar },
  { path: "/admin/inventory", label: "Inventory", icon: FileText },
];

const volunteerItems = [
  { path: "/account", label: "Settings", icon: Settings },

  { path: "/volunteers/stocks", label: "Available Stock", icon: Boxes }, // Updated label and icon for stock
  {
    path: "/volunteers/purchase-history",
    label: "Purchase History",
    icon: History,
  }, // Updated label and icon for purchase history
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
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/crisis" element={<CrisisPage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/not-authorized" element={<NotAuthorized />} />
            </Route>

            {/* Shared routes for both Admin and Volunteer */}
            <Route
              element={<ProtectedRoute allowedRoles={["ADMIN", "VOLUNTEER"]} />}
            >
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/account" element={<ProfilePage />} />
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route
                path="/"
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
                <Route
                  path="/admin/assign-task/:id"
                  element={<AssignTaskPage />}
                />
                <Route
                  path="/admin/inventory"
                  element={<InventoryManagementPage />}
                />
                <Route path="/admin/settings" element={<SettingPage />} />
              </Route>
            </Route>

            {/* Volunteer routes */}
            <Route element={<ProtectedRoute allowedRoles={["VOLUNTEER"]} />}>
              <Route
                path="/"
                element={<DashboardLayout navItems={volunteerItems} />}
              >
                <Route path="" element={<VolunteerPage />} />
                <Route path="/volunteers/stocks" element={<StocksPage />} />
                <Route
                  path="/volunteers/purchase-history"
                  element={<PurchaseHistoryPage />}
                />
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
