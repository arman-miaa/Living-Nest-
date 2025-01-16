import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import Loading from "../pages/Loading";

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <Loading />;
  }

  if (role === "user") {
    return children;
  }

  return <Navigate to="/dashboard" replace={true} />;
};

export default UserRoute;
