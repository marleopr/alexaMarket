import { Box, Typography } from "@mui/material";
import { appStore } from "../../../store/ApplicationStore";

const HeaderLeftContent = () => {
  const { menuIsOpen } = appStore();

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
      {menuIsOpen === "true" && (
        <Typography
          variant="h6"
          sx={{
            mr: 11,
            fontWeight: 700,
          }}
        >
          $ave
        </Typography>
      )}
    </Box>
  );
};

export default HeaderLeftContent;
