import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Toaster position="top-right" />

      <Outlet />
    </div>
  );
};

export default Layout;
