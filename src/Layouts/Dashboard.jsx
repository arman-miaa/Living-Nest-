import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
    return (
      <div className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
         

        <div className="bg-blue-100 flex-1 ">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;