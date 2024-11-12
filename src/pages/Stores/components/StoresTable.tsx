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
import NewRegisterModal from "./NewRegisterModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import StoresFilters from "./StoresFilters";
import { useTranslation } from "react-i18next";
import { TableSortLabel } from "@mui/material";
import PaginationControls from "../../../components/PaginationControls";
import { useState } from "react";
import { storesStore } from "../StoresStore";
import { formatTableDate } from "../../../utils/format-table-date";
import EditStoreModal from "./EditStoreModal";
import { StoreType } from "../../../services/store/get-stores";
import { deleteStoreService } from "../../../services/store/delete-stores";

export default function StoresTable() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
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

  const [tableRows, setTableRows] = useState<RowType[]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRequestSort = (property: keyof RowType) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleConfirmDelete = () => {
  //   console.log("Registro deletado");
  //   setOpenDeleteModal(false);
  // };

  const handleConfirmDelete = async (storeId: number | null) => {
    if (typeof storeId === "number") {
      try {
        const response = await deleteStoreService({
          pMKTP_COD: storeId,
          pACAO: "E",
        });

        if (response) {
          console.log(`Registro com ID ${storeId} deletado`);

          await storesStore
            .getState()
            .getStores(
              storesStore.getState().filters.marketplace,
              storesStore.getState().filters.searchValue,
              storesStore.getState().page * storesStore.getState().rowsPerPage,
              storesStore.getState().rowsPerPage
            );
        } else {
          console.error("Erro ao deletar o registro");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } else {
      console.warn("ID de registro inválido");
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
        <StoresFilters showFilters={showFilters} />

        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            color="primary"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? <Remove /> : <FilterAlt />}
          </IconButton>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Box>
      </Box>

      {open && <NewRegisterModal onClose={() => setOpen(false)} />}

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
        onConfirm={() => handleConfirmDelete(selectedRow)}
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
                  onClick={() => handleRequestSort("name")}
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
                  onClick={() => handleRequestSort("marketplace")}
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
              <TableRow key={row.MKTP_COD}>
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
                  <IconButton aria-label="delete">
                    <Delete
                      onClick={() => {
                        setSelectedRow(row.MKTP_COD);
                        setOpenDeleteModal(true);
                      }}
                      color="error"
                    />
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
