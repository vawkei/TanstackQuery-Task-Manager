import { Outlet } from "react-router-dom";
import MainNavigation from "../components/main-nav/MainNavigation";

const RootLayout = () => {
  return (
    <div>
      <MainNavigation />
      <main
        style={{
          width: "100%",
          maxWidth: "50rem",
          margin: "2rem auto",
      
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
