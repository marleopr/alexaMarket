import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import DesktopHeader from "./DesktopHeader";
import LanguageIcon from "./LanguageIcon";
import { Tooltip } from "@mui/material";
import NotificationIcon from "./NotificationIcon";
import { appStore } from "../../../store/ApplicationStore";
import { routesToAppearInSidebar } from "../../../routes";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeAuthDataFromLocalStorage } from "../../../utils/local-storage-helper";
import { LogoutOutlined } from "@mui/icons-material";
import styled from "styled-components";

export const HEADER_HEIGHT = "68px";

function Header() {
  const { loggedUser, menuIsOpen } = appStore();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const isMenuOpen = menuIsOpen === "true";

  return (
    <CustomAppBar isMenuOpen={isMenuOpen}>
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

          <MenuItem
            key={"logout"}
            onClick={() => {
              removeAuthDataFromLocalStorage();
              window.location.reload();
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <LogoutOutlined />
              <Typography>{t("Logout")}</Typography>
            </Box>
          </MenuItem>
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
        <Tooltip title={loggedUser.name || ""}>
          <Avatar
            alt={loggedUser.name || ""}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 28, height: 28 }}
          />
        </Tooltip>
      </Box>
    </CustomAppBar>
  );
}

export default Header;

const CustomAppBar = styled.div<{ isMenuOpen: boolean }>`
  background-color: #fff;
  box-shadow: none;
  border-bottom: none;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ isMenuOpen }) => (isMenuOpen ? "0 1rem" : "0 16px 0 0")};
  position: sticky;
  top: 0;
  z-index: 99999999;
`;
