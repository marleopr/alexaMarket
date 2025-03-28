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
import Files from "../pages/Files";
import Layout from "../components/Layout";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import { DashboardCustomize, Store } from "@mui/icons-material";
import { TbFileDescription } from "react-icons/tb";
import StorePayment from "../pages/StorePayment";
import Shipping from "../pages/Shipping";
import { MdAttachMoney } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";

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
    path: PATHS.SHIPPING,
    element: <RouteWithMenu element={<Shipping />} />,
    label: "ShippingMenu",
    icon: <MdOutlineLocalShipping />,
  },
  {
    path: PATHS.FILES,
    element: <RouteWithMenu element={<Files />} />,
    label: "FilesMenu",
    icon: <TbFileDescription />,
  },
  {
    path: PATHS.ORDERS,
    element: <RouteWithMenu element={<Orders />} />,
    label: "OrdersMenu",
    icon: <BsBoxSeam />,
  },
  {
    path: PATHS.STORE_PAYMENT,
    element: <RouteWithMenu element={<StorePayment />} />,
    label: "StorePaymentMenu",
    icon: <MdAttachMoney />,
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
