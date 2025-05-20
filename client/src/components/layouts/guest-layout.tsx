import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

const GuestLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default GuestLayout;
