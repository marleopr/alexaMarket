import { Box, Button, Typography } from "@mui/material";
import { appStore } from "../../../store/ApplicationStore";
//import TI9Logo from "../../../assets/logo-ti9-white.png";
import MenuIcon from "@mui/icons-material/Menu";

const HeaderLeftContent = () => {
  const { toggleMenu } = appStore();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mr: 11,
          fontWeight: 700,
        }}
      >
        AlexaMarket
      </Typography>
      <Button onClick={() => toggleMenu()}>
        <MenuIcon />
      </Button>
    </Box>
  );
};

export default HeaderLeftContent;
