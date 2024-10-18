import styled, { keyframes } from "styled-components";

const LoadingScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: #fff;
`;

const spinAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const CircleLoader = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid white;
  border-top-color: red;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingScreen = () => {
  return (
    <LoadingScreenContainer>
      <CircleLoader />
    </LoadingScreenContainer>
  );
};

export default LoadingScreen;
