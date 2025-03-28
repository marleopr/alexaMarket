import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import DeleteConfirmationModal from "../../../../components/DeleteConfirmationModal";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { storesStore } from "../../StoresStore";
import { formatTableDate } from "../../../../utils/format-table-date";
import { StoreType } from "../../../../services/store/get-stores";
import { colors } from "../../../../theme";
import { StoreConfigType } from "../../../../services/store/get-store-config";
import StoreConfigModal from "../StoreConfigModal";
import { deleteStoreConfigService } from "../../../../services/store/delete-store-config";

export const StoreConfigTable = ({
  storeConfig,
  storeData,
  handleGetStoreConfigs,
}: {
  storeConfig: StoreConfigType[];
  storeData: StoreType;
  handleGetStoreConfigs: () => void;
}) => {
  const { t } = useTranslation();
  const { findMarketPlaceName } = storesStore();

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 500, backgroundColor: "transparent" }}
        style={{ backgroundColor: colors.green.light }}
      >
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{t("Store_id")}</TableCell>
            <TableCell>{t("Store_name")}</TableCell>
            <TableCell>{t("start_term")}</TableCell>
            <TableCell>{t("end_term")}</TableCell>
            <TableCell>{t("Fee")}</TableCell>
            <TableCell>{t("flat_rate")}</TableCell>
            <TableCell>{t("Days_to_payment")}</TableCell>
            <TableCell>{t("margin")}</TableCell>
            <TableCell>{t("updated_at")}</TableCell>
            <TableCell>{t("created_at")}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          {storeConfig.map((item) => (
            <TableRow key={item.Id}>
              <TableCell>{item.Id}</TableCell>
              <TableCell>{item.MKTP_COD}</TableCell>
              <TableCell>{findMarketPlaceName(item.MKTP_COD)}</TableCell>
              <TableCell>{formatTableDate(item.start_term)}</TableCell>
              <TableCell>{formatTableDate(item.end_term)}</TableCell>
              <TableCell>{item.percent.toFixed(2)}</TableCell>
              <TableCell>{item.flat_rate}</TableCell>
              <TableCell>{item.payment_day}</TableCell>
              <TableCell>{item.margin.toFixed(2)}</TableCell>
              <TableCell>{formatTableDate(item.updated_at)}</TableCell>
              <TableCell>{formatTableDate(item.created_at)}</TableCell>
              <TableCell>
                <StoreActions
                  row={item}
                  storeData={storeData}
                  handleGetStoreConfigs={handleGetStoreConfigs}
                ></StoreActions>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StoreActions = ({
  row,
  storeData,
  handleGetStoreConfigs,
}: {
  row: StoreConfigType;
  storeData: StoreType;
  handleGetStoreConfigs: () => void;
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteStoreConfigService({
      pID: row.Id as number,
      pMKTP_COD: storeData.MKTP_COD,
      pACAO: "E",
      pMKTP_VLR_PERCEN: row.percent,
      pMKTP_INT_DAYPAY: row.payment_day,
      pMKTP_DAT_INIVIG: row.start_term,
      pMKTP_DAT_FIMVIG: row.end_term,
    });

    if (response.code === "success") {
      setDeleteModalOpen(false);
      return handleGetStoreConfigs();
    }
  };

  return (
    <>
      <Box>
        <IconButton color="primary" onClick={() => setEditModalOpen(true)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => setDeleteModalOpen(true)}>
          <Delete color="warning"/>
        </IconButton>
      </Box>

      {editModalOpen && (
        <StoreConfigModal
          onClose={() => setEditModalOpen(false)}
          row={row}
          storeId={storeData.MKTP_COD}
          refreshStoreConfig={handleGetStoreConfigs}
        />
      )}

      {deleteModalOpen && (
        <DeleteConfirmationModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};
