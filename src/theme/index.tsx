import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

export const colors = {
  green: {
    main: "rgb(0, 150, 136)",
  },
  red:{
    error: "#d32f2f"
  }
};

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
            color: colors.green.main,
            "&:hover": {
              boxShadow: "none",
            },
          },
          text: {
            color: "rgb(54, 65, 82)",
            "&:hover": {
              backgroundColor: "rgb(224, 242, 241)",
              color: colors.green.main,
            },
          },
          outlined: {
            color: colors.green.main,
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
