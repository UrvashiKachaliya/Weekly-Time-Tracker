import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Login from "../Pages/login/Login";

const MainLayout = () => {
  return (
    <div>
      {/* <Header /> */}

      <main
        style={{
          background: "",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
