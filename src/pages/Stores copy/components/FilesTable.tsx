import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Add, Delete, Edit, FilterAlt, Remove } from "@mui/icons-material";
import NewRegisterModal from "./UploadFileModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import StoresFilters from "./FilesFilters";
import { useTranslation } from "react-i18next";
import { TableSortLabel } from "@mui/material";
import PaginationControls from "../../../components/PaginationControls";
import { useState } from "react";
import { storesStore } from "../StoresStore";
import { formatTableDate } from "../../../utils/format-table-date";
import EditStoreModal from "./EditStoreModal";
import { StoreType } from "../../../services/store/get-stores";
import {
  DeleteStorePayload,
  deleteStoreService,
} from "../../../services/store/delete-stores";
import { useNotifications } from "@toolpad/core";
import UploadFileModal from "./UploadFileModal";

export default function FilesTable() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [orderBy, setOrderBy] = useState<keyof RowType>("name");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const { storeList, rowsPerPage, setRowsPerPage, page, setPage, count } =
    storesStore();

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    storeData: StoreType | null;
  }>({
    isOpen: false,
    storeData: null,
  });

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedRowName, setSelectedRowName] = useState<string | null>(null);
  const [storePercentage, setStorePercentage] = useState<number | null>(null);
  const [storeDayPay, setStoreDayPay] = useState<number>(0);

  const notifications = useNotifications();

  const handleRequestSort = (property: keyof StoreType) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    const newOrderDirection = isAsc ? "desc" : "asc";
    setOrderDirection(newOrderDirection);
    setOrderBy(property as keyof RowType);

    const sortedList = [...storeList].sort((a, b) => {
      const isAscOrder = newOrderDirection === "asc";
      if (property === "MKTP_NOM_NAM") {
        return (
          (a.MKTP_NOM_NAM < b.MKTP_NOM_NAM ? -1 : 1) * (isAscOrder ? 1 : -1)
        );
      }
      if (property === "MKTP_NAM_MKTPLC") {
        return (
          (a.MKTP_NAM_MKTPLC < b.MKTP_NAM_MKTPLC ? -1 : 1) *
          (isAscOrder ? 1 : -1)
        );
      }
      return 0;
    });

    storesStore.setState({ storeList: sortedList });
  };

  const handleRowSelect = (rowId: number, rowName: string) => {
    setSelectedRow(rowId);
    setSelectedRowName(rowName);
  };

  const openDeleteConfirmation = (
    rowId: number,
    rowName: string,
    percentage: number,
    dayPay: number
  ) => {
    setSelectedRow(rowId);
    setSelectedRowName(rowName);
    setStorePercentage(percentage);
    setStoreDayPay(dayPay);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (storeData: DeleteStorePayload) => {
    const requestMsg = await deleteStoreService(storeData);

    if (requestMsg) {
      notifications.show(
        `${storeData.pMKTP_NOM_NAM} ${t("Notifications.StoreDelete")}`,
        {
          severity: "success",
        }
      );
    } else {
      notifications.show(
        `${t("Notifications.StoreDeleteError")} ${storeData.pMKTP_NOM_NAM}`,
        {
          severity: "error",
        }
      );
    }
  };

  const handleConfirmDelete = async (
    storeId: number | null,
    storeName: string | null,
    storePercentage: number | null,
    storeDayPay: number
  ) => {
    if (typeof storeId === "number" && storeName && storePercentage !== null) {
      try {
        const storeData: DeleteStorePayload = {
          pMKTP_COD: storeId,
          pACAO: "E",
          pMKTP_NOM_NAM: storeName,
          pMKTP_VLR_PERCEN: storePercentage,
          pMKTP_INT_DAYPAY: storeDayPay,
          pMKTP_DAT_INIVIG: "",
          pMKTP_DAT_FIMVIG: "",
          pMKTP_VAL_MAR: 0,
          pMKTP_VAL_FLTRAT: 0,
          pMKTP_COD_MKT: 0,
        };

        await handleDelete(storeData);

        await storesStore
          .getState()
          .getStores(
            storesStore.getState().filters.marketplace,
            storesStore.getState().filters.searchValue,
            storesStore.getState().page * storesStore.getState().rowsPerPage,
            storesStore.getState().rowsPerPage
          );
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } else {
      console.warn(
        "ID de registro, nome da loja ou valor de pMKTP_VLR_PERCEN inválido"
      );
    }
    setOpenDeleteModal(false);
  };

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Box>
      </Box>

      {open && <UploadFileModal onClose={() => setOpen(false)} />}

      {editModal && (
        <EditStoreModal
          storeData={editModal.storeData as any}
          onClose={() =>
            setEditModal({
              isOpen: false,
              storeData: null,
            })
          }
        />
      )}

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() =>
          handleConfirmDelete(
            selectedRow,
            selectedRowName,
            storePercentage,
            storeDayPay
          )
        }
        storeId={selectedRow}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell
                sortDirection={orderBy === "name" ? orderDirection : false}
              >
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? orderDirection : "asc"}
                  onClick={() => handleRequestSort("MKTP_NOM_NAM")}
                >
                  {t("Common.Name")}
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={
                  orderBy === "marketplace" ? orderDirection : false
                }
              >
                <TableSortLabel
                  active={orderBy === "marketplace"}
                  direction={orderBy === "marketplace" ? orderDirection : "asc"}
                  onClick={() => handleRequestSort("MKTP_NAM_MKTPLC")}
                >
                  {t("Common.Marketplace")}
                </TableSortLabel>
              </TableCell>
              <TableCell>{t("Common.Commission")}</TableCell>
              <TableCell>{t("Marketplaces.FlatRate")}</TableCell>
              <TableCell>{t("Marketplaces.MarginError")}</TableCell>
              <TableCell>{t("Marketplaces.DaysForPayment")}</TableCell>
              <TableCell>{t("Marketplaces.StartOfTerm")}</TableCell>
              <TableCell>{t("Marketplaces.EndOfTerm")}</TableCell>
              <TableCell>{t("Marketplaces.CreateDate")}</TableCell>
              <TableCell>{t("Marketplaces.LastUpdate")}</TableCell>
              <TableCell>{t("Common.Actions")}</TableCell>
            </TableRow>

            {storeList.map((row) => (
              <TableRow
                key={row.MKTP_COD}
                onClick={() => handleRowSelect(row.MKTP_COD, row.MKTP_NOM_NAM)}
              >
                <TableCell>{row.MKTP_COD}</TableCell>
                <TableCell>{row.MKTP_NOM_NAM}</TableCell>
                <TableCell>{row.MKTP_NAM_MKTPLC}</TableCell>
                <TableCell>{row.MKTP_VLR_PERCEN}</TableCell>
                <TableCell>{row.MKTP_VAL_FLTRAT}</TableCell>
                <TableCell>{row.MKTP_VAL_MAR}</TableCell>
                <TableCell>{row.MKTP_INT_DAYPAY}</TableCell>
                <TableCell>{formatTableDate(row.MKTP_DAT_INIVIG)}</TableCell>
                <TableCell>{formatTableDate(row.MKTP_DAT_FIMVIG)}</TableCell>
                <TableCell>{formatTableDate(row.MKTP_DAT_CRE)}</TableCell>
                <TableCell>{formatTableDate(row.MKTP_DAT_UPD)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() =>
                      setEditModal({
                        isOpen: true,
                        storeData: row,
                      })
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      openDeleteConfirmation(
                        row.MKTP_COD,
                        row.MKTP_NOM_NAM,
                        row.MKTP_VLR_PERCEN,
                        row.MKTP_INT_DAYPAY
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, page) => handleChangePage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ overflow: "hidden" }}
            labelRowsPerPage={t("Common.Pagination")}
            ActionsComponent={(props) => (
              <PaginationControls
                {...props}
                onPageChange={props.onPageChange}
              />
            )}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}

export interface RowType {
  MKTP_COD: number;
  id: number;
  name: string;
  marketplace: string;
  percentage: number;
  marginError: number;
  flatRate: number;
  daysForPayment: number;
  startOfTerm: string;
  endOfTerm: string;
  createDate: string;
  lastUpdate: string;
}

export function createData(
  MKTP_COD: number,
  id: number,
  name: string,
  marketplace: string,
  percentage: number,
  marginError: number,
  flatRate: number,
  daysForPayment: number,
  startOfTerm: string,
  endOfTerm: string,
  createDate: string = new Date().toISOString().split("T")[0],
  lastUpdate: string = new Date().toISOString().split("T")[0]
): RowType {
  return {
    MKTP_COD,
    id,
    name,
    marketplace,
    percentage,
    marginError,
    flatRate,
    daysForPayment,
    startOfTerm,
    endOfTerm,
    createDate,
    lastUpdate,
  };
}
