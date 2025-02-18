import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../Hooks/ThemeProvider ";


const MainLayout = () => {
  const { darkMode } = useTheme();
    return (
      <div className={`${darkMode ? 'bg-dark': ''}`}>
        <div
          className={`  sticky z-50 top-0 ${darkMode ? "bg-dark" : "bg-[#1f5b73] "}`}
        >
          <Navbar></Navbar>
        </div>
        <div className="container mx-auto min-h-[calc(100vh-290px)]">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default MainLayout;