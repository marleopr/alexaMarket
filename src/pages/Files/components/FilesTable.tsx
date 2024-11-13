import * as React from "react";
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
import { Add, Delete, Edit } from "@mui/icons-material";
import { rows } from "../../../constants/mockDataFiles";
import NewRegisterModal from "./UploadFileModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
//import FilesFilters from "./FilesFilters";
import { useTranslation } from "react-i18next";
import PaginationControls from "../../../components/PaginationControls";

export default function FilesTable() {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [tableRows, setTableRows] = React.useState(rows);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [searchFree, //setSearchFree
    ] = React.useState("");
  const [searchDate, //setSearchDate
    ] = React.useState("");
  const [marketplace, //setMarketplace
    ] = React.useState("");

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
       {/* <FilesFilters
          rows={rows}
          marketplace={marketplace}
          setMarketplace={setMarketplace}
          searchFree={searchFree}
          setSearchFree={setSearchFree}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          t={t}
        />*/}
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
        storeId={null}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{t("Common.Name")}</TableCell>
              <TableCell>{t("Common.Marketplace")}</TableCell>
              <TableCell>{t("Common.User")}</TableCell>
              <TableCell>{t("Files.DateUp")}</TableCell>
              <TableCell>{t("Files.DateProcessing")}</TableCell>
              <TableCell>{t("Common.Type")}</TableCell>
              <TableCell>{t("Common.Actions")}</TableCell>
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
