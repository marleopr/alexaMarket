import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { colors } from "../../../theme";
import { NotificationImportant } from "@mui/icons-material";

const settings = [
  {
    label: "English",
    value: "en",
  },
  { label: "Português", value: "pt" },
  { label: "Español", value: "es" },
];

function NotificationIcon() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <NotificationImportant />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.label}
            onClick={() => handleChangeLanguage(setting.value)}
          >
            <Typography
              sx={{
                textAlign: "center",
                color:
                  currentLanguage === setting.value
                    ? colors.green.main
                    : "text.primary",
              }}
            >
              {setting.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
export default NotificationIcon;
