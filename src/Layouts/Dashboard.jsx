import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";

const Dashboard = () => {
    return (
      <div className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
         

        <div className=" flex-1 px-4 md:ml-60 ">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;