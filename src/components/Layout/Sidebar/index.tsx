import styled from "styled-components";
import { HEADER_HEIGHT } from "../Header";
import { Box, Button, Tooltip } from "@mui/material";
import { routesToAppearInSidebar } from "../../../routes";
import { useNavigate } from "react-router-dom";
import { appStore } from "../../../store/ApplicationStore";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { menuIsOpen } = appStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isActive = (path: string) => window.location.pathname.includes(path);

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
              display: "flex",
              alignItems: "center",
              justifyContent: menuIsOpen ? "flex-start" : "center",
              gap: menuIsOpen ? "8px" : "0",
              width: "100%",
              "& .icon": {
                fontSize: "24px",
              },
            }}
          >
            {!menuIsOpen ? (
              <span className="icon">{route.icon}</span>
            ) : (
              <>
                <Tooltip title={t(route.label)} placement="right">
                  <span className="icon">{route.icon}</span>
                </Tooltip>
                <span className="menu-text">{t(route.label)}</span>
              </>
            )}
          </Button>
        ))}
      </Box>
    </Bar>
  );
};

export default Sidebar;

const Bar = styled.div<{ expanded: string }>`
  width: ${(props) => (props.expanded === "true" ? "180px" : "38px")};
  background-color: #fff;
  transition: width 0.4s;
  overflow: hidden;
  position: fixed;
  gap: 0.2rem;
  height: calc(100vh - ${HEADER_HEIGHT});
  padding: 0 1rem;
  min-width: ${(props) => (props.expanded === "true" ? "180px" : "58px")};
  
  .menu-text {
    display: ${(props) => (props.expanded === "true" ? "inline" : "none")};
  }

  @media (max-width: 600px) {
    width: 16px;
    min-width: 16px;
    position: sticky;
    padding: 0;
    & > *:first-child {
      display: none;
    }
  }
`;
