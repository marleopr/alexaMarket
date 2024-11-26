import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Logout } from "@mui/icons-material";

interface LoggedUser {
  data: {
    Email: string;
  };
}

const UserMenu = ({ loggedUser }: { loggedUser: LoggedUser }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("save-token");
    setAnchorElUser(null);
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={loggedUser.data.Email || ""}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={loggedUser.data.Email || ""}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 28, height: 28, cursor: "pointer" }}
          />
        </IconButton>
      </Tooltip>
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
        <MenuItem onClick={handleLogout}>
          <Tooltip title="Logout">
            <Typography textAlign="center">
              <Logout />{" "}
            </Typography>
          </Tooltip>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
