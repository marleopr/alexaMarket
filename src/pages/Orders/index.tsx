import { Typography } from "@mui/material";
import OrdersTable from "./components/OrdersTable";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        {t("OrdersMenu")}
      </Typography>
      <br />
      <OrdersTable />
    </div>
  );
};

export default Orders;
