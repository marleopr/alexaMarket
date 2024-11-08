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

import { changePasswordService } from "../../services/login/change-password-service";

const ResetPasswordPage: FC = () => {
  const notifications = useNotifications();
  const pwdhash = new URLSearchParams(window.location.search).get("pwdhash");

  useEffect(() => {
    if (!pwdhash) {
      navigate(PATHS.LOGIN);
      notifications.show("Link inválido", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  }, []);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const { isAuthenticated } = appStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.DASHBOARD);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    try {
      const res = await changePasswordService({
        login: data.get("email") as string,
        recoveryHash: pwdhash as string,
        confPassword: data.get("confirmPassword") as string,
        password: data.get("newPassword") as string,
      });

      if (res.code === "error") {
        return;
      }

      notifications.show(res.data.message, {
        severity: "info",
        autoHideDuration: 3000,
      });

      navigate(PATHS.LOGIN);
    } catch (error) {
      notifications.show("Erro, contate um administrador", {
        severity: "error",
        autoHideDuration: 3000,
      });
      console.error("Login error:", error);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const newPassword = document.getElementById(
      "newPassword"
    ) as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "confirmPassword"
    ) as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Email inválido");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;

    if (!newPassword.value) {
      setNewPasswordError(true);
      setNewPasswordErrorMessage("Senha inválida");
      isValid = false;
    } else if (!passwordRegex.test(newPassword.value)) {
      setNewPasswordError(true);
      setNewPasswordErrorMessage(
        "A senha deve conter: 8 a 100 caracteres; letras maiúsculas e minúsculas; caracteres especiais e números."
      );
      isValid = false;
    } else {
      setNewPasswordError(false);
      setNewPasswordErrorMessage("");
    }

    if (!confirmPassword.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Confirme sua senha");
      isValid = false;
    } else if (confirmPassword.value !== newPassword.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("As senhas não coincidem");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
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
            $ave
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Esqueceu a senha?
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mb: 2, color: "gray" }}
          >
            Informe suas credenciais e enviaremos um link de recadastro
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
              <FormLabel htmlFor="email">E-mail</FormLabel>
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
              <FormLabel htmlFor="newPassword">Novo password</FormLabel>
              <TextField
                error={newPasswordError}
                helperText={newPasswordErrorMessage}
                name="newPassword"
                id="newPassword"
                autoComplete="current-newPassword"
                required
                fullWidth
                variant="outlined"
                color={newPasswordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">
                Confirme sua senha
              </FormLabel>
              <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="current-confirmPassword"
                required
                fullWidth
                variant="outlined"
                color={confirmPasswordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              onClick={validateInputs}
            >
              Redefinir senha
            </Button>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              <Link to={PATHS.LOGIN}>Já possui uma conta ?</Link>
            </Box>
          </Box>
        </Card>
      </CardContainer>
    </Wrapper>
  );
};

export default ResetPasswordPage;

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
