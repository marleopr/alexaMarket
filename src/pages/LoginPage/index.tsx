import { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { appStore } from "../../store/ApplicationStore";
import { PATHS } from "../../routes/paths";
import { loggedUser } from "../../services/auth/logged-user";
import { loginService } from "../../services/auth/login";
import { useNotifications } from "@toolpad/core";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage: FC = () => {
  const notifications = useNotifications();

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const { isAuthenticated, setIsAuthenticated, setLoggedUser } = appStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    try {
      const res = await loginService({
        username: data.get("email") as string,
        password: data.get("password") as string,
      });

      if (res.code === "error") {
        return notifications.show("Usuário ou senha inválidos", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      const loggedUserInfo = await loggedUser();

      if (loggedUserInfo.code === "error") {
        return notifications.show("Erro ao buscar informações do usuário", {
          severity: "error",
          autoHideDuration: 3000,
        });
      }

      setLoggedUser(loggedUserInfo.data);
      setIsAuthenticated(true);
      navigate(PATHS.DASHBOARD);
    } catch (error) {
      notifications.show("Erro ao realizar login", {
        severity: "error",
        autoHideDuration: 3000,
      });
      console.error("Login error:", error);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Email inválido");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
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
        <Card variant="outlined" sx={{ p: 4, maxWidth: 400 }}>
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
            Bem-vindo ao $AlexaMarket
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mb: 2, color: "gray" }}
          >
            Por favor, entre com seus dados
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="seu@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              onClick={validateInputs}
            >
              Entrar
            </Button>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
              <Link href="#" variant="body2">
                Não tem uma conta? Registre-se
              </Link>
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
