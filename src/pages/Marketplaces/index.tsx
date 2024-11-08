import { Typography } from "@mui/material";
import MarketplacesTable from "./components/MarketplacesTable";
import { useTranslation } from "react-i18next";
import { appStore } from "../../store/ApplicationStore";
import { useEffect } from "react";
import { storesStore } from "./StoresStore";

const Marketplaces = () => {
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
        {t("MarketplacesMenu")}
      </Typography>
      <br />
      <MarketplacesTable />
    </div>
  );
};

export default Marketplaces;
