import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <main className="flex-grow ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
