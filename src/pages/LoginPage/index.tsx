import { FC, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { appStore } from "../../store/ApplicationStore";
import { PATHS } from "../../routes/paths";
import { useNotifications } from "@toolpad/core";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { loginService } from "../../services/login/login-service";
import { getUserInfoService } from "../../services/user/get-user-info-service";
import {
  saveTokenInLocalStorage,
  saveUserIdInLocalStorage,
} from "../../utils/local-storage-helper";
import { useTranslation } from "react-i18next";

const LoginPage: FC = () => {
  const notifications = useNotifications();
  const { t } = useTranslation();

  const [userError, setUserError] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const { isAuthenticated, setIsAuthenticated, setLoggedUser } = appStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    try {
      const response = await loginService({
        username: data.get("username") as string,
        password: data.get("password") as string,
      });

      if (response.code === "error") {
        return notifications.show(
          response.error?.message || "Erro ao realizar login",
          {
            severity: "error",
            autoHideDuration: 3000,
          }
        );
      }

      const { token, companyId } = response.data;

      saveTokenInLocalStorage(token);

      if (companyId) {
        saveUserIdInLocalStorage(companyId);

        const loggedUserInfo = await getUserInfoService({ id: companyId });

        if (loggedUserInfo.code === "error") {
          return notifications.show("Erro ao buscar informações do usuário", {
            severity: "error",
            autoHideDuration: 3000,
          });
        }

        setLoggedUser({
          username: loggedUserInfo.data.username, // Use the username returned by the backend
          role: "user", // Assuming it's a regular user
          name: loggedUserInfo.data.name, // Name from the user info response
          // You can omit email and other details if not needed
        });
      } else {
        setLoggedUser({
          username: "admin", // Admin username, could be a fixed value
          role: "admin", // Role for admin
          // You can exclude 'name' or any other data if not necessary
        });
      }

      setIsAuthenticated(true);
      navigate(PATHS.DASHBOARD);
    } catch (error) {
      notifications.show("Erro inesperado ao realizar login", {
        severity: "error",
        autoHideDuration: 3000,
      });
      console.error("Login error:", error);
    }
  };

  const validateInputs = () => {
    const user = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!user.value || user.value.trim().length === 0) {
      setUserError(true);
      setUserErrorMessage("Usuário inválido");
      isValid = false;
    } else {
      setUserError(false);
      setUserErrorMessage("");
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage("Insira uma senha");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Wrapper>
      <CardContainer>
        <Card
          variant="outlined"
          sx={{ p: 4, maxWidth: 400, borderRadius: "8px" }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 3,
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
            }}
          >
            Offer
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mb: 2, color: "gray" }}
          >
            {t("loginMessage")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="user">{t("Common.User")}</FormLabel>
              <TextField
                error={userError}
                helperText={userErrorMessage}
                id="username"
                type="text"
                name="username"
                placeholder="Nome de usuário"
                autoComplete="username"
                required
                fullWidth
                variant="outlined"
                color={userError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{t("Common.Password")}</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" size="large">
              {t("loginButton")}
            </Button>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              <Link to={PATHS.FORGOT_PASSWORD}>{t("loginForgotPassword")}</Link>
            </Box>
          </Box>
        </Card>
      </CardContainer>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%);
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
