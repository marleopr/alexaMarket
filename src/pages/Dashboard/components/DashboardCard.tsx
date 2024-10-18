import { Skeleton } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface DashboardCardProps {
  title: string;
  value: string | number;
  backgroundcolor?: string;
  isLoading?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  backgroundcolor = "blue",
  isLoading = true,
}) => {
  if (isLoading) {
    return <StyledSkeleton variant="rounded" />;
  }

  return (
    <WidgetCard backgroundcolor={backgroundcolor}>
      <WidgetCardValue>{value}</WidgetCardValue>
      <WidgetCardTitle>{title}</WidgetCardTitle>
    </WidgetCard>
  );
};

export default DashboardCard;

const StyledSkeleton = styled(Skeleton)`
  width: calc(33.33% - 5rem) !important;
  height: 7.5rem !important;
  padding: 0.5rem 1rem;
  min-width: 12.5rem;
`;

const WidgetCard = styled.div<{ backgroundcolor: string }>`
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  height: 7.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.backgroundcolor};
  width: calc(33.33% - 5rem);
  min-width: 12.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.8rem;
`;

const WidgetCardTitle = styled.div`
  margin: 0;
  font-size: 1rem;
  color: #fff;
`;

const WidgetCardValue = styled.div`
  font-size: 1.3rem;
  color: #fff;
`;
