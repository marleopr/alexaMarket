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
import { Add, Delete, Edit, FilterAlt, Remove } from "@mui/icons-material";
import { rows } from "../../../constants/mockDataMarketPlaces";
import NewRegisterModal from "./NewRegisterModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import MarketplacesFilters from "./MarketplacesFilters";

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

export default function MarketplacesTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchFree, setSearchFree] = React.useState("");
  const [marketplace, setMarketplace] = React.useState("");
  const [searchCombo, setSearchCombo] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [tableRows, setTableRows] = React.useState(rows);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [showAdditionalFilters, setShowAdditionalFilters] = React.useState("");

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

    const isComboMatch = Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchCombo.toLowerCase())
    );

    const isMarketplacesMatch = marketplace
      ? row.marketplace === marketplace
      : true;
    return isFreeMatch && isComboMatch && isMarketplacesMatch;
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
        <MarketplacesFilters
          rows={rows}
          marketplace={marketplace}
          setMarketplace={setMarketplace}
          searchFree={searchFree}
          setSearchFree={setSearchFree}
          searchCombo={searchCombo}
          setSearchCombo={setSearchCombo}
          showAdditionalFilters={showAdditionalFilters}
          setShowAdditionalFilters={setShowAdditionalFilters}
        />
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
            onClick={() => setShowAdditionalFilters((prev) => !prev)}
          >
            {showAdditionalFilters ? <Remove /> : <FilterAlt />}
          </IconButton>
          <IconButton color="primary" onClick={handleClickOpen}>
            <Add />
          </IconButton>
        </Box>
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
              <TableCell>%</TableCell>
              <TableCell>MARGIN ERROR</TableCell>
              <TableCell>FLAT RATE</TableCell>
              <TableCell>DAYS FOR PAYMENT</TableCell>
              <TableCell>START OF TERM</TableCell>
              <TableCell>END OF TERM</TableCell>
              <TableCell>CREATE DATE</TableCell>
              <TableCell>LAST UPDATE</TableCell>
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
                <TableCell>{row.percentage}</TableCell>
                <TableCell>{row.marginError}</TableCell>
                <TableCell>{row.flatRate}</TableCell>
                <TableCell>{row.daysForPayment}</TableCell>
                <TableCell>{row.startOfTerm}</TableCell>
                <TableCell>{row.endOfTerm}</TableCell>
                <TableCell>{row.createDate}</TableCell>
                <TableCell>{row.lastUpdate}</TableCell>
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
