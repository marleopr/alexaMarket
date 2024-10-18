import styled from "styled-components";
import DashboardCard from "./components/DashboardCard";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Container>
        <DashboardCard
          value={"R$ 3.115.000.000,00"}
          title="Total Users Total Users"
        />
        <DashboardCard
          title="Total Users Total Users"
          value={"R$ 3.115.000.000,00"}
          isLoading={false}
        />
        <DashboardCard
          title="Total Users Total Users"
          value={"R$ 3.115.000.000,00"}
        />
      </Container>
    </div>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
