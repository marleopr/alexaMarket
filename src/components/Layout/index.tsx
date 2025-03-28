import React from "react";
import styled from "styled-components";
import Header, { HEADER_HEIGHT } from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import { appStore } from "../../store/ApplicationStore";

const Container = styled(Box)`
  display: flex;
  height: calc(100dvh - ${HEADER_HEIGHT});
`;

const MiddleColumn = styled(Box)<{ open: boolean }>`
  background-color: #eef2f6;
  height: fit-content;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1.5rem;
  margin-left: ${(props) => (props.open ? "150px" : "70px")};
  transition: margin 0.4s;
  width: 100%;
  overflow: hidden;

  @media (max-width: 600px) {
    margin-left: 0px;
  }
`;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { menuIsOpen } = appStore();

  const open = menuIsOpen === "true";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
      }}
    >
      <Header />
      <Container>
        <Sidebar />
        <MiddleColumn open={open}>
          <Box maxWidth={{ xs: "350px", md: "100%" }} margin="0 auto">
            {children}
          </Box>
        </MiddleColumn>
      </Container>
    </div>
  );
};

export default Layout;
