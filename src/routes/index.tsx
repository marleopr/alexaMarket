/* eslint-disable react-refresh/only-export-components */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { PATHS } from "./paths";
import LoginPage from "../pages/LoginPage";
import React from "react";
import Dashboard from "../pages/Dashboard";
import Stores from "../pages/Stores";
import Orders from "../pages/Orders";
// import Files from "../pages/Files";
import Files from "../pages/Stores copy";
import Layout from "../components/Layout";
import AxiosInterceptorComponent from "../api/AxiosInterceptorComponent";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { DashboardCustomize, Store } from "@mui/icons-material";
import { GrOrderedList } from "react-icons/gr";
import { TbFileDescription } from "react-icons/tb";

const RouteWithMenu = ({ element }: { element: React.ReactNode }) => {
  return (
    <PrivateRoute>
      <Layout>{element}</Layout>
    </PrivateRoute>
  );
};

export const routesToAppearInSidebar = [
  {
    path: PATHS.DASHBOARD,
    element: <RouteWithMenu element={<Dashboard />} />,
    label: "DashboardMenu",
    icon: <DashboardCustomize />,
  },
  {
    path: PATHS.STORES,
    element: <RouteWithMenu element={<Stores />} />,
    label: "StoresMenu",
    icon: <Store />,
  },
  {
    path: PATHS.ORDERS,
    element: <RouteWithMenu element={<Orders />} />,
    label: "OrdersMenu",
    icon: <GrOrderedList />,
  },
  {
    path: PATHS.FILES,
    element: <RouteWithMenu element={<Files />} />,
    label: "FilesMenu",
    icon: <TbFileDescription />,
  },
];

const loginRoutes = [
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: PATHS.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
];

const AppRoutes: React.FC = () => {
  const routes = [
    ...loginRoutes,
    ...routesToAppearInSidebar,
    {
      path: "*",
      element: <Navigate to={PATHS.DASHBOARD} />,
    },
  ];

  return (
    <Router>
      <AxiosInterceptorComponent />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
