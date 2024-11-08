import React from "react";
import styled from "styled-components";
import Header, { HEADER_HEIGHT } from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Container = styled(Box)`
  display: flex;
  height: calc(100vh - ${HEADER_HEIGHT});
  overflow: auto;
`;

const MiddleColumn = styled(Box)`
  flex: 1;
  background-color: #eef2f6;
  height: fit-content;
  min-height: calc(100vh - ${HEADER_HEIGHT});
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1.5rem;
`;

const LastColumn = styled(Box)`
  width: 16px;
  background-color: #fff;
  position: sticky;
  top: 0;
  height: calc(100vh - ${HEADER_HEIGHT});
`;

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <MiddleColumn>
          <Box maxWidth={{ xs: "350px", md: "100%" }} margin="0 auto">
            {children}
          </Box>
        </MiddleColumn>
        <LastColumn />
      </Container>
    </>
  );
};

export default Layout;
