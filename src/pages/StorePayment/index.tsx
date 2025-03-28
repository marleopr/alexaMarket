import { Typography } from "@mui/material";
import Table from "./components/Table";
import { useTranslation } from "react-i18next";
import { appStore } from "../../store/ApplicationStore";
import { useEffect } from "react";
import { storePaymentStore } from "./StorePaymentStore";
import { storesStore } from "../Stores/StoresStore";

const StorePayment = () => {
  const { t } = useTranslation();
  const { getMarketplaces, getUsers } = appStore();
  const { resetOrdersState, getStorePayment, getFilesType } = storePaymentStore();
  const { getStores } = storesStore();

  useEffect(() => {
    getUsers();
    getMarketplaces();
    getFilesType();
    getStorePayment("", "", "",  0, 10);
    getStores("", "", 0, 1000);

    return () => {
      resetOrdersState();
    };
  }, []);

  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        {t("StorePaymentMenu")}
      </Typography>
      <br />
      <Table />
    </div>
  );
};

export default StorePayment;
