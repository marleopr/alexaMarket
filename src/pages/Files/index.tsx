import { Typography } from "@mui/material";
import FilesTable from "./components/FilesTable";
import { useTranslation } from "react-i18next";
import { appStore } from "../../store/ApplicationStore";
import { useEffect } from "react";
import { filesStore } from "./FilesStore";
import { storesStore } from "../Stores/StoresStore";

const Stores = () => {
  const { t } = useTranslation();
  const { getMarketplaces, getUsers } = appStore();
  const { resetFilesState, getFiles, getFilesType } = filesStore();
  const { getStores } = storesStore();

  useEffect(() => {
    getUsers();
    getMarketplaces();
    getFilesType();
    getFiles("", "", "", "", "", "", 0, 10);
    getStores("", "", 0, 1000);

    return () => {
      resetFilesState();
    };
  }, []);

  return (
    <div>
      <Typography fontSize={30} fontWeight={"bold"}>
        {t("FilesMenu")}
      </Typography>
      <br />
      <FilesTable />
    </div>
  );
};

export default Stores;
