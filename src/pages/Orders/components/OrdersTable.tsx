import { useTheme } from "@mui/material/styles";
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
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
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

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: Readonly<TablePaginationActionsProps>) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function OrdersTable() {
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
            Choose file to import
          </Button>
          <Button
            endIcon={<ArrowUpward />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Upload
          </Button>
          <Button
            endIcon={<AppRegistration />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Apply
          </Button>
          <Button
            endIcon={<Restore />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Reset
          </Button>
          <Button
            endIcon={<Download />}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Download File
          </Button>
        </Box>
      </Box>

      {/* <NewRegisterModal
          open={open}
          onClose={handleClose}
          onAddRegister={handleAddRegister}
        /> */}

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>INDEX</TableCell>
              <TableCell>CONCILIATION DATE</TableCell>
              <TableCell>USER</TableCell>
              <TableCell>SALE NOTE</TableCell>
              <TableCell>RETURN NOTE</TableCell>
              <TableCell>INTERNAL ORDER</TableCell>
              <TableCell>MARKETPLACE ORDER</TableCell>
              <TableCell>ORDER DATE</TableCell>
              <TableCell>ORDER STATUS</TableCell>
              <TableCell>MARKETPLACE</TableCell>
              <TableCell>AÇÕES</TableCell>
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
                ActionsComponent={TablePaginationActions}
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
