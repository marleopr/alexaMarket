import { Typography } from "@mui/material";
import MarketplacesTable from "./components/MarketplacesTable";

const Marketplaces = () => {
  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        Marketplaces
      </Typography>
      <br />
      <MarketplacesTable />
    </div>
  );
};

export default Marketplaces;
