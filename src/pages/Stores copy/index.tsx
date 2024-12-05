import { Typography } from "@mui/material";
import StoresTable from "./components/FilesTable";
import { useTranslation } from "react-i18next";
import { appStore } from "../../store/ApplicationStore";
import { useEffect } from "react";
import { storesStore } from "./StoresStore";

const Files = () => {
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
        {t("FilesMenu")}
      </Typography>
      <br />
      <StoresTable />
    </div>
  );
};

export default Files;
