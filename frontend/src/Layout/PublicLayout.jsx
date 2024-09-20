import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <main className="flex-grow container px-4 py-8 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
