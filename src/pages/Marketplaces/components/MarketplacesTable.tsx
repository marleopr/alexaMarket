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
import { rows } from "../../../constants/mockDataMarketPlaces";
import NewRegisterModal from "./NewRegisterModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import MarketplacesFilters from "./MarketplacesFilters";
import { useTranslation } from "react-i18next";
import { TableSortLabel } from "@mui/material";
import PaginationControls from "../../../components/PaginationControls";
import { useState } from "react";
import { storesStore } from "../StoresStore";
import { formatDate } from "../../../utils/format-date-by-locale";

export default function MarketplacesTable() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [tableRows, setTableRows] = useState(rows);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof RowType>("name");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const { storeList, rowsPerPage, setRowsPerPage, page, setPage } =
    storesStore();

  const handleRequestSort = (property: keyof RowType) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleAddRegister = (newRow: RowType) => {
    setTableRows((prev) => [...prev, newRow]);
  };

  const handleConfirmDelete = () => {
    console.log("Registro deletado");
    setOpenDeleteModal(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableRows.length) : 0;

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
        <MarketplacesFilters showFilters={showFilters} />

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

      <NewRegisterModal
        open={open}
        onClose={() => setOpen(false)}
      />

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
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

            {(rowsPerPage > 0
              ? storeList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : storeList
            ).map((row) => (
              <TableRow key={row.MKTP_COD}>
                <TableCell>{row.MKTP_COD}</TableCell>
                <TableCell>{row.MKTP_NOM_NAM}</TableCell>
                <TableCell>{row.MKTP_NAM_MKTPLC}</TableCell>
                <TableCell>{row.MKTP_VLR_PERCEN}</TableCell>
                <TableCell>{row.MKTP_VAL_FLT_RAT}</TableCell>
                <TableCell>{row.MKTP_VAL_MAR}</TableCell>
                <TableCell>{row.MKTP_INT_DAYPAY}</TableCell>
                <TableCell>{formatDate(row.MKTP_DAT_INIVIG)}</TableCell>
                <TableCell>{formatDate(row.MKTP_DAT_FIMVIG)}</TableCell>
                <TableCell>{formatDate(row.MKTP_DAT_CRE)}</TableCell>
                <TableCell>{formatDate(row.MKTP_DAT_UPD)}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <Delete
                      onClick={() => setOpenDeleteModal(true)}
                      color="error"
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={storeList.length}
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
