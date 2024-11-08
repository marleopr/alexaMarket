import { Box, Button, Typography } from "@mui/material";
import { appStore } from "../../../store/ApplicationStore";
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
        $ave
      </Typography>
      <Button onClick={() => toggleMenu()}>
        <MenuIcon />
      </Button>
    </Box>
  );
};

export default HeaderLeftContent;
