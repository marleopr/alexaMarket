import { Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import { appStore } from "../store/ApplicationStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = appStore();

  return isAuthenticated ? children : <Navigate to={PATHS.LOGIN} />;
};

export default PrivateRoute;
