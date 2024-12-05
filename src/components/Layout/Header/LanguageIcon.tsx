import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CommentIcon from "@mui/icons-material/Comment";
import { colors } from "../../../theme";
import enFlag from "../../../assets/enFlag.png";
import ptFlag from "../../../assets/ptFlag.png";
import esFlag from "../../../assets/esFlag.png";
import CheckIcon from "@mui/icons-material/Check";

const settings = [
  {
    label: <img src={enFlag} alt="English" width="32" height="32" />,
    value: "en",
  },
  {
    label: <img src={ptFlag} alt="Português" width="32" height="32" />,
    value: "pt",
  },
  {
    label: <img src={esFlag} alt="Español" width="32" height="32" />,
    value: "es",
  },
];

function LanguageIcon() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChangeLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <CommentIcon />
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
            key={setting.value}
            onClick={() => handleChangeLanguage(setting.value)}
            sx={{
              backgroundColor:
                currentLanguage === setting.value ? "#ececec" : "inherit",
              border:
                currentLanguage === setting.value
                  ? `2px solid #e2e2e2`
                  : "none",
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {setting.label}
              {currentLanguage === setting.value && (
                <CheckIcon sx={{ ml: 1, color: colors.green.main }} />
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default LanguageIcon;
