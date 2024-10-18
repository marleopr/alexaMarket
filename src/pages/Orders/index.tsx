import { Typography } from "@mui/material";
import OrdersTable from "./components/OrdersTable";

const Orders = () => {
  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        Orders
      </Typography>
      <br />
      <OrdersTable />
    </div>
  );
};

export default Orders;
