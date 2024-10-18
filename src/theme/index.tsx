import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

export const theme = createTheme(
  {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          contained: {
            boxShadow: "none",
            backgroundColor: "rgb(224, 242, 241)",
            color: "rgb(0, 150, 136)",
            "&:hover": {
              boxShadow: "none",
            },
          },
          text: {
            color: "rgb(54, 65, 82)",
            "&:hover": {
              backgroundColor: "rgb(224, 242, 241)",
              color: "rgb(0, 150, 136)",
            },
          },
          outlined: {
            color: "rgb(0, 150, 136)",
            borderColor: "rgb(224, 242, 241)",
            "&:hover": {
              backgroundColor: "rgb(224, 242, 241)",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Roboto",
            color: "rgb(54, 65, 82)",
          },
        },
      },
    },
  },
  ptBR
);
