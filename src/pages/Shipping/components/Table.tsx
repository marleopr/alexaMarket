import Box from "@mui/material/Box";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import ShippingModal from "./ShippingModal";
import Filters from "./Filters";
import { useTranslation } from "react-i18next";
import PaginationControls from "../../../components/PaginationControls";
import { useState } from "react";
import { shippingStore } from "../ShippingStore";
import { useNotifications } from "@toolpad/core";
import { ShippingType } from "../../../services/shipping/get-shipping";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { formatter } from "./ShippingModal/formatter";
import { putShippingService } from "../../../services/shipping/put-shipping";
import removeTime from "../../../utils/remove-time";

export default function Table() {
  const { t } = useTranslation();
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false);

  const {
    shippingList,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    count,
    getShipping,
  } = shippingStore();

  const [registerModalOpen, setRegisterModalOpen] = useState<
    boolean | ShippingType
  >(false);

  const [openDeleteModal, setOpenDeleteModal] = useState<
    boolean | ShippingType
  >(false);

  const handleDelete = async () => {
    const formattedPayload = formatter(openDeleteModal as ShippingType, "E");

    const response = await putShippingService(formattedPayload);

    setLoading(false);

    if (response.code !== "success") {
      notifications.show(response.error as unknown as string, {
        severity: "error",
      });
      return;
    }

    notifications.show(t("Success"), {
      severity: "success",
    });

    getShipping();
  };

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Box>
      <Filters openModal={() => setRegisterModalOpen(true)} />

      {registerModalOpen && (
        <ShippingModal
          onClose={() => setRegisterModalOpen(false)}
          data={registerModalOpen as ShippingType}
        />
      )}

      {openDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell>{t("MKTP_COD")}</TableCell>
              <TableCell>{t("MKTP_NOM_NAM")}</TableCell>
              <TableCell>{t("storeConfig_Id")}</TableCell>
              <TableCell>{t("storeConfig_startTerm")}</TableCell>
              <TableCell>{t("storeConfig_endTerm")}</TableCell>
              <TableCell>{t("shipping_id")}</TableCell>
              <TableCell>{t("name")}</TableCell>
              <TableCell>{t("start_track")}</TableCell>
              <TableCell>{t("end_track")}</TableCell>
              <TableCell>{t("value")}</TableCell>
              <TableCell>{t("start_term")}</TableCell>
              <TableCell>{t("end_term")}</TableCell>
              <TableCell>{t("Actions")}</TableCell>
            </TableRow>

            {shippingList.map((row) => (
              <TableRow key={row.shipping_id}>
                <TableCell>{row.MKTP_COD}</TableCell>
                <TableCell>{row.MKTP_NOM_NAM}</TableCell>
                <TableCell>{row.storeConfig_Id}</TableCell>
                <TableCell>
                  {removeTime(row.storeConfig_startTerm)}
                </TableCell>
                <TableCell>
                  {removeTime(row.storeConfig_endTerm)}
                </TableCell>
                <TableCell>{row.shipping_id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.start_track}</TableCell>
                <TableCell>{row.end_track}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{removeTime(row.start_term)}</TableCell>
                <TableCell>{removeTime(row.end_term)}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    disabled={loading}
                    onClick={() => setOpenDeleteModal(row)}
                  >
                    <Delete color="warning" />
                  </IconButton>
                  <IconButton
                    disabled={loading}
                    color="primary"
                    onClick={() => setRegisterModalOpen(row)}
                  >
                    <Edit />
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
        </MuiTable>
      </TableContainer>
    </Box>
  );
}
