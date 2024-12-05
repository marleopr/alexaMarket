import AppRoutes from "./routes";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { appStore } from "./store/ApplicationStore";
import LoadingScreen from "./components/LoadingScreen";
import { useEffect } from "react";
import {
  getTokenFromLocalStorage,
  getUserIdFromLocalStorage,
  removeAuthDataFromLocalStorage,
  saveRefreshTokenInLocalStorage,
  saveTokenInLocalStorage,
} from "./utils/local-storage-helper";
import { getUserInfoService } from "./services/user/get-user-info-service";
import { refreshTokenService } from "./services/login/refresh-token-service";
import { getFunctions } from "./services/functions/get-functions";

function App() {
  const {
    setApplicationLoading,
    applicationLoading,
    setIsAuthenticated,
    setLoggedUser,
  } = appStore();

  const refreshToken = async () => {
    try {
      const res = await refreshTokenService({
        refreshToken: getTokenFromLocalStorage()!,
      });
      if (res.code === "success") {
        saveTokenInLocalStorage(res.data.accessToken);
        saveRefreshTokenInLocalStorage(res.data.refreshToken);
        return getLoggedUser();
      }
      removeAuthDataFromLocalStorage();
      setApplicationLoading(false);
    } catch (error) {
      console.error("Error refreshing token", error);
      setApplicationLoading(false);
    }
  };

  const getLoggedUser = async () => {
    try {
      const res = await getUserInfoService({
        id: getUserIdFromLocalStorage()!,
      });
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

  const handleGetFunctions = async () => {
    const res = await getFunctions();
    if (res.code === "success") {
      console.log("functions -> ", res.data);
    }
  };

  useEffect(() => {
    handleGetFunctions();

    const hasToken = getTokenFromLocalStorage();
    if (hasToken) {
      getLoggedUser();
    } else {
      setApplicationLoading(false);
    }
  }, []);

  if (applicationLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider
        slotProps={{
          snackbar: {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            autoHideDuration: 3000,
          },
        }}
      >
        <AppRoutes />
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
