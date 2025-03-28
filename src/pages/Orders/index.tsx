import { Typography } from "@mui/material";
import OrdersTable from "./components/OrdersTable";
import { useTranslation } from "react-i18next";
import { appStore } from "../../store/ApplicationStore";
import { useEffect } from "react";
import { ordersStore } from "./OrdersStore";
import { storesStore } from "../Stores/StoresStore";

const Orders = () => {
  const { t } = useTranslation();
  const { getMarketplaces, getUsers } = appStore();
  const { resetOrdersState, getOrders, getFilesType } = ordersStore();
  const { getStores } = storesStore();

  useEffect(() => {
    getUsers();
    getMarketplaces();
    getFilesType();
    getOrders("", "", "", "", 0, 10);
    getStores("", "", 0, 1000);

    return () => {
      resetOrdersState();
    };
  }, []);

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
