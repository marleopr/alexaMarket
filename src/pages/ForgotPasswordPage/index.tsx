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

import { recoverPasswordService } from "../../services/login/recover-password-service";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage: FC = () => {
  const notifications = useNotifications();
  const { t } = useTranslation();

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

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
      const res = await recoverPasswordService({
        login: data.get("email") as string,
        recoveryAddress: data.get("account") as string,
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

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Email inválido");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
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
            {t("loginForgotPassword")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", mb: 2, color: "gray" }}
          >
            {t("loginForgotPasswordMessage")}
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
              <FormLabel htmlFor="email">{t("Common.Email")}</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              onClick={validateInputs}
            >
              {t("Common.Send")}
            </Button>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              <Link to={PATHS.LOGIN}>{t("alreadyHaveAnAccount")}</Link>
            </Box>
          </Box>
        </Card>
      </CardContainer>
    </Wrapper>
  );
};

export default ForgotPasswordPage;

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
