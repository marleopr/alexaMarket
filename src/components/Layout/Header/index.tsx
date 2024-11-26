import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DesktopHeader from "./DesktopHeader";
import LanguageIcon from "./LanguageIcon";
import NotificationIcon from "./NotificationIcon";
import { appStore } from "../../../store/ApplicationStore";
import { routesToAppearInSidebar } from "../../../routes";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserMenu from "./UserMenu";

export const HEADER_HEIGHT = "68px";

function Header() {
  const { loggedUser } = appStore();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#fff" }}
      sx={{
        boxShadow: "none",
        borderBottom: "none",
        height: { md: HEADER_HEIGHT, xs: "56px" },
      }}
    >
      <Toolbar>
        <DesktopHeader />

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {routesToAppearInSidebar.map((route) => (
              <MenuItem
                key={route.path}
                onClick={() => {
                  navigate(route.path);
                  window.scrollTo(0, 0);
                  handleCloseNavMenu();
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {route.icon}
                  <Typography>{t(route.label)}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <NotificationIcon />
          <LanguageIcon />
          <UserMenu loggedUser={loggedUser} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
