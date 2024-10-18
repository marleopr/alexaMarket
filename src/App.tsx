import AppRoutes from "./routes";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

function App() {
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
