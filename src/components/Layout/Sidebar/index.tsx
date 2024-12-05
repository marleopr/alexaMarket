import styled from "styled-components";
import { HEADER_HEIGHT } from "../Header";
import { Box, Button } from "@mui/material";
import { routesToAppearInSidebar } from "../../../routes";
import { useNavigate } from "react-router-dom";
import { appStore } from "../../../store/ApplicationStore";
import { useTranslation } from "react-i18next";
import { removeAuthDataFromLocalStorage } from "../../../utils/local-storage-helper";
import { LogoutRounded } from "@mui/icons-material";

const Sidebar = () => {
  const { menuIsOpen } = appStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isActive = (path: string) => window.location.pathname.includes(path);

  const handleLogout = () => {
    removeAuthDataFromLocalStorage();
    window.location.reload();
  };

  return (
    <Bar expanded={menuIsOpen.toString()}>
      <Box display="flex" gap={0.2} flexDirection="column">
        {routesToAppearInSidebar.map((route) => (
          <Button
            key={route.path}
            variant={isActive(route.path) ? "contained" : "text"}
            onClick={() => {
              navigate(route.path);
              window.scrollTo(0, 0);
            }}
            sx={{
              gap: menuIsOpen ? "8px" : "0",
            }}
            title={t(route.label)}
            startIcon={route.icon}
          >
            <span className="menu-text">{t(route.label)}</span>
          </Button>
        ))}
      </Box>

      <Button
        variant="text"
        onClick={handleLogout}
        startIcon={<LogoutRounded />}
        sx={{ mb: 2 }}
      >
        <span className="menu-text"> {t("Logout")}</span>
      </Button>
    </Bar>
  );
};

export default Sidebar;

const Bar = styled.div<{ expanded: string }>`
  width: ${(props) => (props.expanded === "true" ? "180px" : "68px")};
  background-color: #fff;
  transition: width 0.4s;

  overflow: hidden;
  position: fixed;
  gap: 0.2rem;
  height: calc(100vh - ${HEADER_HEIGHT});
  padding: ${(props) => (props.expanded === "true" ? "0 1rem" : "0 0.1rem")};

  min-width: ${(props) => (props.expanded === "true" ? "180px" : "68px")};

  .menu-text {
    display: ${(props) => (props.expanded === "true" ? "inline" : "none")};
  }

  justify-content: space-between;
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    width: 16px;
    min-width: 16px;
    position: sticky;
    padding: 0;
    & > *:first-child {
      display: none;
    }
  }
`;
