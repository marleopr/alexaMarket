import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import {
  FilterAlt,
  FilterAltOff,
  ThumbUpAltRounded,
  RunningWithErrors,
  BackHandOutlined,
  Visibility,
  Download,
} from "@mui/icons-material";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import OrdersFilters from "./OrdersFilters";
import { useTranslation } from "react-i18next";
import PaginationControls from "../../../components/PaginationControls";
import { useEffect, useState } from "react";
import { ordersStore } from "../OrdersStore";
import { OrderType } from "../../../services/orders/get-orders-service";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import { colors } from "../../../theme";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { appStore } from "../../../store/ApplicationStore";
import { formatTableDate } from "../../../utils/format-table-date";
import { formatToBRL } from "../../../utils/format-value-to-brl";
import {
  getOrderPaymentsService,
  OrderPaymentType,
} from "../../../services/orders/get-order-payments-service";
import ModalOrderDetails from "./ModalOrderDetails";

export default function OrdersTable() {
  const { t } = useTranslation();

  const [openDeleteModal, setOpenDeleteModal] = useState<{
    isOpen: boolean;
    row: OrderType | null;
  }>({
    isOpen: false,
    row: null,
  });

  const [showFilters, setShowFilters] = useState(true);
  const { orderList, rowsPerPage, setRowsPerPage, page, setPage, count } =
    ordersStore();

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

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <OrdersFilters showFilters={showFilters} />

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
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>{t("ConciliationDate")}</TableCell>
              <TableCell>{t("Common.User")}</TableCell>
              <TableCell>{t("InternalOrder")}</TableCell>
              <TableCell>{t("StoreOrder")}</TableCell>
              <TableCell>{t("OrderDate")}</TableCell>
              <TableCell>{t("RawValue")}</TableCell>
              <TableCell>{t("TotalValue")}</TableCell>
              <TableCell>{t("ReceivedValue")}</TableCell>
              <TableCell>{t("ReceivedPercentage")}</TableCell>
              <TableCell>{t("DuePercentage")}</TableCell>
              <TableCell>{t("Status")}</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>

            {orderList.map((row) => (
              <ExpansiveTableRow key={row.PEDS_COD} row={row} />
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

const ExpansiveTableRow = ({ row }: { row: OrderType }) => {
  const [open, setOpen] = useState(false);
  const [modalOrderDetails, setModalOrderDetails] = useState(false);

  const { userList } = appStore();

  const [payments, setPayments] = useState<OrderPaymentType[]>([]);

  useEffect(() => {
    if (open) {
      handleGetOrderPayments();
    }
  }, [open]);

  const handleGetOrderPayments = async () => {
    const response = await getOrderPaymentsService({
      Params: [
        { name: "PEDS_EXT_COD", value: row.PEDS_EXT_COD, condition: "=" },
      ],
    });
    if (response.code !== "success") {
      return;
    }
    setPayments(response.data.data.records);
  };

  return (
    <>
      {modalOrderDetails && (
        <ModalOrderDetails
          id={row.PEDS_EXT_COD}
          onClose={() => setModalOrderDetails(false)}
        />
      )}

      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.PEDS_COD}
        </TableCell>
        <TableCell>{formatTableDate(row.CONM_DAT_CONMKT)}</TableCell>
        <TableCell>
          {userList.find((user) => user.ExternalUserID == row.USUS_COD)?.Email}
        </TableCell>
        <TableCell>{row.PEDS_COD_ERP || "-"}</TableCell>
        <TableCell>{row.PEDS_EXT_COD || "-"}</TableCell>
        <TableCell>{formatTableDate(row.PEDS_DAT_DATPDS)}</TableCell>
        <TableCell>{formatToBRL(row.PEDS_VAL_VALTOT)}</TableCell>
        <TableCell>{formatToBRL(row.PEDS_VAL_VENCAL)}</TableCell>
        <TableCell>{formatToBRL(row.PEDS_VAL_PAGMKT)}</TableCell>
        <TableCell>{row.PEDS_VAL_COMPAG}</TableCell>
        <TableCell>{row.PEDS_VAL_COMACD}</TableCell>
        <TableCell>{situationIcon(row.PEDS_STR_STAPAG)}</TableCell>
        <TableCell>
          <span onClick={() => setModalOrderDetails(true)}>
            <Visibility style={{ cursor: "pointer" }} />
          </span>
        </TableCell>
        <TableCell>
          <span onClick={() => setModalOrderDetails(true)}>
            <Download style={{ cursor: "pointer" }} />
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              style={{
                backgroundColor: colors.green.light,
                border: `1px solid ${colors.green.main}`,
                borderRadius: 8,
                padding: 16,
              }}
              sx={{ margin: 2 }}
            >
              <Typography
                variant="body2"
                gutterBottom
                fontWeight="600"
                component="div"
                style={{ borderBottom: `1px solid ${colors.green.main}` }}
              >
                {t("Payments")}
              </Typography>
              <PaymentsTable payments={payments} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const PaymentsTable = ({ payments }: { payments: OrderPaymentType[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 500, backgroundColor: "transparent" }}
        style={{ backgroundColor: colors.green.light }}
      >
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{t("PaymentDate")}</TableCell>
            <TableCell>{t("PaymentValue")}</TableCell>
          </TableRow>
          {payments.map((payment) => (
            <TableRow key={payment.REPP_COD}>
              <TableCell>{payment.REPP_COD}</TableCell>
              <TableCell>{formatTableDate(payment.REPP_DAT_DATPAG)}</TableCell>
              <TableCell>{formatToBRL(payment.REPP_VAL_PAG)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const situationIcon = (situation: "VERIFY" | "PENDING" | "PAID") => {
  if (situation === "VERIFY") {
    return (
      <span style={{ color: "#edca1e" }}>
        <BackHandOutlined color="inherit" />
      </span>
    );
  }
  if (situation === "PENDING") {
    return <RunningWithErrors color="info" />;
  }
  if (situation === "PAID") {
    return <ThumbUpAltRounded color="success" />;
  }
};
