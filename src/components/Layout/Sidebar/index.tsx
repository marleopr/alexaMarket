import styled from "styled-components";
import { HEADER_HEIGHT } from "../Header";
import { Box, Button } from "@mui/material";
import { routesToAppearInSidebar } from "../../../routes";
import { useNavigate } from "react-router-dom";
import { appStore } from "../../../store/ApplicationStore";
import { useTranslation } from "react-i18next";
import { removeAuthDataFromLocalStorage } from "../../../utils/local-storage-helper";
import { LogoutRounded } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { colors } from "../../../theme";

const Sidebar = () => {
  const { menuIsOpen, toggleMenu } = appStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isActive = (path: string) => window.location.pathname.includes(path);

  const handleLogout = () => {
    removeAuthDataFromLocalStorage();
    window.location.reload();
  };

  const menuIsExpanded = menuIsOpen === "true";

  return (
    <Bar expanded={menuIsOpen.toString()}>
      <Box display="flex" flexDirection="column">
        <Button onClick={() => toggleMenu()} style={{ marginBottom: "0.5rem" }}>
          <MenuIcon />
        </Button>

        <Box display="flex" flexDirection="column" gap="0.2rem">
          {routesToAppearInSidebar.map((route) => (
            <MenuButton
              menuIsExpanded={menuIsExpanded}
              key={route.path}
              isSelected={isActive(route.path)}
              onClick={() => {
                navigate(route.path);
                window.scrollTo(0, 0);
              }}
            >
              {route.icon}
              <span className="menu-text">{t(route.label)}</span>
            </MenuButton>
          ))}
        </Box>
      </Box>

      <MenuButton
        onClick={handleLogout}
        style={{ marginBottom: "2rem", border: "none" }}
        menuIsExpanded={menuIsExpanded}
      >
        <LogoutRounded />
        <span className="menu-text">{t("Logout")}</span>
      </MenuButton>
    </Bar>
  );
};

export default Sidebar;

const Bar = styled.div<{ expanded: string }>`
  background-color: #fff;
  transition: width 0.4s;

  overflow: hidden;
  position: fixed;
  gap: 0.2rem;
  height: calc(100vh - ${HEADER_HEIGHT});
  padding: ${(props) => (props.expanded === "true" ? "0" : "0 0.1rem")};

  justify-content: space-between;
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    display: none;
  }

  width: ${(props) => (props.expanded === "true" ? "150px" : "68px")};
  padding: 4px;
`;

const MenuButton = styled.button<{
  isSelected?: boolean;
  menuIsExpanded?: boolean;
}>`
  gap: 0.5rem;
  display: ${(props) => (props.menuIsExpanded ? "flex" : "")};
  cursor: pointer;
  height: 36px;
  background-color: ${(props) =>
    props.isSelected ? colors.green.light : "transparent"};

  color: ${colors.green.main};

  border-radius: 0.5rem;
  text-align: center;

  border: ${(props) =>
    props.isSelected ? "none" : `0.5px solid ${colors.green.light}`};

  align-items: center;

  padding: ${(props) => (props.menuIsExpanded ? " 0 16px" : "0")};
  &:hover {
    background-color: ${colors.green.light};
    color: ${colors.green.main};
  }

  .menu-text {
    display: ${(props) => (props.menuIsExpanded ? "flex" : "none")};
  }

  & > svg {
    font-size: ${(props) => (props.menuIsExpanded ? "1.2rem" : "1.4rem")};
  }

  transition: all 0.4s;
`;
