import { Typography } from "@mui/material";
import StoresTable from "./components/Table/StoresTable";
import { useTranslation } from "react-i18next";
import { appStore } from "../../store/ApplicationStore";
import { useEffect } from "react";
import { storesStore } from "./StoresStore";

const Stores = () => {
  const { t } = useTranslation();
  const { getMarketplaces } = appStore();
  const { resetStoreState, getStores } = storesStore();

  useEffect(() => {
    getMarketplaces();
    getStores("", "", 0, 10);

    return () => {
      resetStoreState();
    };
  }, []);

  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        {t("StoresMenu")}
      </Typography>
      <br />
      <StoresTable />
    </div>
  );
};

export default Stores;
