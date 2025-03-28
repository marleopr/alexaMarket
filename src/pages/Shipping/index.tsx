import { Typography } from "@mui/material";
import Table from "./components/Table";
import { useTranslation } from "react-i18next";
import { appStore } from "../../store/ApplicationStore";
import { useEffect } from "react";
import { shippingStore } from "./ShippingStore";
import { storesStore } from "../Stores/StoresStore";

const Shipping = () => {
  const { t } = useTranslation();
  const { getMarketplaces } = appStore();
  const { resetStoreState, getShipping, filters, rowsPerPage, page } =
    shippingStore();

  const { getStores } = storesStore();

  useEffect(() => {
    getMarketplaces();

    getStores("", "", 0, 999);

    return () => {
      resetStoreState();
    };
  }, []);

  useEffect(() => {
    getShipping();
  }, [filters, rowsPerPage, page]);

  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        {t("ShippingMenu")}
      </Typography>
      <br />
      <Table />
    </div>
  );
};

export default Shipping;
