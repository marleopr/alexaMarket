import * as React from "react";
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
import { Add, Delete, Edit } from "@mui/icons-material";
import { rows } from "../../../constants/mockDataFiles";
import NewRegisterModal from "./UploadFileModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import FilesFilters from "./FilesFilters";

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

export default function FilesTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [tableRows, setTableRows] = React.useState(rows);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [searchFree, setSearchFree] = React.useState("");
  const [searchDate, setSearchDate] = React.useState("");
  const [marketplace, setMarketplace] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRegister = (newRow: RowType) => {
    setTableRows((prev) => [...prev, newRow]);
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
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
    setPage(0);
  };

  const filteredRows = tableRows.filter((row) => {
    const isFreeMatch = row.name
      .toLowerCase()
      .includes(searchFree.toLowerCase());

    const isDateMatch = searchDate
      ? row.dateUp.split("/").reverse().join("-").includes(searchDate)
      : true;

    const isMarketplacesMatch = marketplace
      ? row.marketplace === marketplace
      : true;
    return isFreeMatch && isDateMatch && isMarketplacesMatch;
  });

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
        <FilesFilters
          rows={rows}
          marketplace={marketplace}
          setMarketplace={setMarketplace}
          searchFree={searchFree}
          setSearchFree={setSearchFree}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
        />
        <IconButton color="primary" onClick={handleClickOpen}>
          <Add />
        </IconButton>
      </Box>

      <NewRegisterModal
        open={open}
        onClose={handleClose}
        onAddRegister={handleAddRegister}
      />

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>MARKETPLACE</TableCell>
              <TableCell>USER</TableCell>
              <TableCell>DATE UP</TableCell>
              <TableCell>DATE PROCESSING</TableCell>
              <TableCell>TYPE</TableCell>
              <TableCell>AÇÕES</TableCell>
            </TableRow>

            {(rowsPerPage > 0
              ? filteredRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.marketplace}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.dateUp}</TableCell>
                <TableCell>{row.dateProcessing}</TableCell>
                <TableCell>{row.type}</TableCell>

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

export interface RowType {
  id: number;
  name: string;
  marketplace: string;
  user: string;
  dateUp: string;
  dateProcessing: string;
  type: number;
}

export function createData(
  id: number,
  name: string,
  marketplace: string,
  user: string,
  dateUp: string,
  dateProcessing: string,
  type: number
): RowType {
  return {
    id,
    name,
    marketplace,
    user,
    dateUp,
    dateProcessing,
    type,
  };
}
