/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { PATHS } from "./paths";
import { appStore } from "../store/ApplicationStore";
import LoginPage from "../pages/LoginPage";
import LoadingScreen from "../components/LoadingScreen";
import React from "react";
import { loggedUser } from "../services/auth/logged-user";
import { refreshTokenService } from "../services/auth/refresh-token";
import Dashboard from "../pages/Dashboard";
import Marketplaces from "../pages/Marketplaces";
import Orders from "../pages/Orders";
import Files from "../pages/Files";
import Layout from "../components/Layout";
import AxiosInterceptorComponent from "../api/AxiosInterceptorComponent";

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
    label: "Dashboard",
  },
  {
    path: PATHS.MARKETPLACES,
    element: <RouteWithMenu element={<Marketplaces />} />,
    label: "Marketplaces",
  },
  {
    path: PATHS.ORDERS,
    element: <RouteWithMenu element={<Orders />} />,
    label: "Orders",
  },
  {
    path: PATHS.FILES,
    element: <RouteWithMenu element={<Files />} />,
    label: "Files",
  },
];

const loginRoutes = [
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
];

const adminRoutes = [
  {
    path: "/admin",
    element: <RouteWithMenu element={<div>admin page?</div>} />, //TODO: Verificar necessidade
  },
];

const AppRoutes: React.FC = () => {
  const {
    isAdmin,
    setApplicationLoading,
    applicationLoading,
    setIsAuthenticated,
    setLoggedUser,
  } = appStore();

  const routes = [
    ...loginRoutes,
    ...routesToAppearInSidebar,
    ...(isAdmin ? adminRoutes : []),
    {
      path: "*",
      element: <Navigate to={PATHS.DASHBOARD} />,
    },
  ];

  const refreshToken = async () => {
    try {
      const res = await refreshTokenService({
        refreshToken: localStorage.getItem("refreshToken")!,
      });
      if (res.code === "success") {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        return getLoggedUser();
      }
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setApplicationLoading(false);
    } catch (error) {
      console.error("Error refreshing token", error);
      setApplicationLoading(false);
    }
  };

  const getLoggedUser = async () => {
    try {
      const res = await loggedUser();
      if (res.code === "success") {
        setLoggedUser(res.data);
        setIsAuthenticated(true);
      } else {
        await refreshToken();
      }
    } catch (error) {
      console.error("Error fetching logged user", error);
      await refreshToken();
    } finally {
      setApplicationLoading(false);
    }
  };

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    if (hasToken) {
      getLoggedUser();
    } else {
      setApplicationLoading(false);
    }
  }, []);

  return (
    <>
      {applicationLoading && <LoadingScreen />}
      {!applicationLoading && (
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
      )}
    </>
  );
};

export default AppRoutes;
