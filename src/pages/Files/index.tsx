import { Typography } from "@mui/material";
import FilesTable from "./components/FilesTable";
import { useTranslation } from "react-i18next";

const Files = () => {
  const { t } = useTranslation();

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

export default Files;
