import Box from "@mui/material/Box";
import { Table as MuiTable } from "@mui/material/";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";
import Filters from "./Filters";
import { useTranslation } from "react-i18next";
import PaginationControls from "../../../components/PaginationControls";
import { useState } from "react";
import { storePaymentStore } from "../StorePaymentStore";
import { formatTableDate } from "../../../utils/format-table-date";
import { formatToBRL } from "../../../utils/format-value-to-brl";

export default function Table() {
  const { t } = useTranslation();

  const [showFilters, setShowFilters] = useState(true);
  const {
    storePaymentList,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    count,
  } = storePaymentStore();

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  console.log(storePaymentList);
  return (
    <>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Filters showFilters={showFilters} />

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
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>{t("DEPOSIT_DATE")}</TableCell>
              <TableCell>{t("MKTP_NOM_NAM")}</TableCell>
              <TableCell>{t("VALUE")}</TableCell>
            </TableRow>

            {storePaymentList.map((row) => (
              <TableRow
                sx={{ "& > *": { borderBottom: "unset" } }}
                key={row.id}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{formatTableDate(row.date)}</TableCell>
                <TableCell>{row.MKTP_NOM_NAM || "-"}</TableCell>
                <TableCell>{formatToBRL(row.value)}</TableCell>
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
        </MuiTable>
      </TableContainer>
    </>
  );
}
