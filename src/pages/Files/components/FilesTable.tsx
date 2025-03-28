import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Add, FilterAlt, FilterAltOff } from "@mui/icons-material";
import UploadFileModal from "./UploadFileModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import FilesFilters from "./FilesFilters";
import { useTranslation } from "react-i18next";
import PaginationControls from "../../../components/PaginationControls";
import { useState } from "react";
import { filesStore } from "../FilesStore";
import { formatTableDate } from "../../../utils/format-table-date";
import { FileType } from "../../../services/files/get-files-service";
import { appStore } from "../../../store/ApplicationStore";
import { storesStore } from "../../Stores/StoresStore";

export default function FilesTable() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState<{
    isOpen: boolean;
    row: FileType | null;
  }>({
    isOpen: false,
    row: null,
  });

  const { userList } = appStore();
  const { findMarketPlaceName } = storesStore();
  const [showFilters, setShowFilters] = useState(true);
  const { fileList, rowsPerPage, setRowsPerPage, page, setPage, count } =
    filesStore();

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      {openDeleteModal.isOpen && (
        <DeleteConfirmationModal
          onClose={() => setOpenDeleteModal({ isOpen: false, row: null })}
          onConfirm={() => {
            setOpenDeleteModal({ isOpen: false, row: null });
          }}
        />
      )}

      {open && <UploadFileModal onClose={() => setOpen(false)} />}

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FilesFilters showFilters={showFilters} />

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
            {showFilters ? <FilterAltOff /> : <FilterAlt />}
          </IconButton>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <Add />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{t("Common.Name")}</TableCell>
              <TableCell>{t("Common.Store")}</TableCell>
              <TableCell>{t("Common.User")}</TableCell>
              <TableCell>{t("Files.DateUp")}</TableCell>
              <TableCell>{t("Files.DateProcessing")}</TableCell>
              <TableCell>{t("Common.Type")}</TableCell>
              <TableCell>{t("error_desc")}</TableCell>
            </TableRow>

            {fileList.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{findMarketPlaceName(row.mktp_cod)}</TableCell>
                <TableCell>
                  {
                    userList.find(
                      (user) => user.ExternalUserID === row.usus_cod
                    )?.Email
                  }
                </TableCell>
                <TableCell>{formatTableDate(row.created_at)}</TableCell>
                <TableCell>{formatTableDate(row.data_processing)}</TableCell>
                <TableCell>{t(`Files.${row.type}`)}</TableCell>
                <TableCell>{row.error_desc || "-"}</TableCell>
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
    </>
  );
}
