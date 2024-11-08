import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import {
  AppRegistration,
  ArrowUpward,
  Delete,
  Download,
  Edit,
  Restore,
} from "@mui/icons-material";
import { rows } from "../../../constants/mockDataOrders";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import TooltipComponent from "../../../components/TooltipComponent";
import { useState } from "react";
import OrdersFilters from "./OrdersFilters";
import { useTranslation } from "react-i18next";
import PaginationControls from "../../../components/PaginationControls";

export default function OrdersTable() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchFree] = useState("");
  const [searchCombo] = useState("");
  const [tableRows] = useState(rows);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteClick = () => setOpenDeleteModal(true);

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleConfirmDelete = () => setOpenDeleteModal(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableRows.length) : 0;

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = tableRows.filter((row) => {
    const isFreeMatch = row.user
      .toLowerCase()
      .includes(searchFree.toLowerCase());

    const isComboMatch = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchCombo.toLowerCase())
    );

    return isFreeMatch && isComboMatch;
  });

  return (
    <Box>
      <OrdersFilters />
      <Box sx={{ display: "flex", flexDirection: "row", mb: 2, mt: 2 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Button
            endIcon={<ArrowUpward />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            {t("Buttons.Import")}
          </Button>
          <Button
            endIcon={<ArrowUpward />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            {t("Buttons.Upload")}
          </Button>
          <Button
            endIcon={<AppRegistration />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            {t("Buttons.Apply")}
          </Button>
          <Button
            endIcon={<Restore />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            {t("Buttons.Reset")}
          </Button>
          <Button
            endIcon={<Download />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            {t("Buttons.Download")}
          </Button>
        </Box>
      </Box>

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>{t("Orders.Index")}</TableCell>
              <TableCell>{t("Orders.ConciliationDate")}</TableCell>
              <TableCell>{t("Common.User")}</TableCell>
              <TableCell>{t("Orders.SaleNote")}</TableCell>
              <TableCell>{t("Orders.ReturnNote")}</TableCell>
              <TableCell>{t("Orders.InternalOrder")}</TableCell>
              <TableCell>{t("Orders.MarketplaceOrder")}</TableCell>
              <TableCell>{t("Orders.OrderDate")}</TableCell>
              <TableCell>{t("Orders.OrderStatus")}</TableCell>
              <TableCell>{t("Common.Marketplace")}</TableCell>
              <TableCell>{t("Common.Actions")}</TableCell>
            </TableRow>

            {(rowsPerPage > 0
              ? filteredRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRows
            ).map((row) => (
              <TableRow key={row.index}>
                <TableCell>{row.index}</TableCell>
                <TableCell>{row.sale_note}</TableCell>
                <TableCell>
                  <TooltipComponent text={row.user} maxCharacters={30} />
                </TableCell>
                <TableCell>{row.sale_note}</TableCell>
                <TableCell>{row.return_note}</TableCell>
                <TableCell>{row.internal_order}</TableCell>
                <TableCell>{row.marketplace_order}</TableCell>
                <TableCell>{row.order_date}</TableCell>
                <TableCell>{row.order_status}</TableCell>
                <TableCell>{row.marketplace}</TableCell>
                <TableCell>
                  <IconButton aria-label="edit" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <Delete onClick={handleDeleteClick} color="error" />
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={filteredRows.length}
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
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface RowType {
  index: number;
  conciliation_date: string;
  user: string;
  sale_note: string | number;
  return_note: string | number;
  internal_order: string;
  marketplace_order: string;
  order_date: string;
  order_status: string;
  marketplace: string;
}

export function createData(
  index: number,
  conciliation_date: string = new Date().toISOString().split("T")[0],
  user: string,
  sale_note: string | number,
  return_note: string | number,
  internal_order: string,
  marketplace_order: string,
  order_date: string = new Date().toISOString().split("T")[0],
  order_status: string,
  marketplace: string
): RowType {
  return {
    index,
    conciliation_date,
    user,
    sale_note,
    return_note,
    internal_order,
    marketplace_order,
    order_date,
    order_status,
    marketplace,
  };
}
