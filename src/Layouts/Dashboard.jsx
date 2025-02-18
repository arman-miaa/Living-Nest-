import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import { useTheme } from "../Hooks/ThemeProvider ";

const Dashboard = () => {
  const { darkMode } = useTheme();
    return (
      <div className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>

        <div className={`flex-1 px-4 md:ml-60 ${darkMode ? 'bg-dark': ''}`}>
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;