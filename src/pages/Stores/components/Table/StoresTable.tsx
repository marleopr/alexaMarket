import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Add,
  Delete,
  Edit,
  FilterAlt,
  FilterAltOff,
} from "@mui/icons-material";
import NewRegisterModal from "../NewRegisterModal";
import DeleteConfirmationModal from "../../../../components/DeleteConfirmationModal";
import StoresFilters from "../StoresFilters";
import { useTranslation } from "react-i18next";
import { Button, Collapse, TableSortLabel, Typography } from "@mui/material";
import PaginationControls from "../../../../components/PaginationControls";
import { useEffect, useState } from "react";
import { storesStore } from "../../StoresStore";
import { formatTableDate } from "../../../../utils/format-table-date";
import EditStoreModal from "../EditStoreModal";
import { StoreType } from "../../../../services/store/get-stores";
import {
  DeleteStorePayload,
  deleteStoreService,
} from "../../../../services/store/delete-stores";
import { useNotifications } from "@toolpad/core";
import { colors } from "../../../../theme";
import {
  defaultStoreConfig,
  getStoreConfigService,
  StoreConfigType,
} from "../../../../services/store/get-store-config";
import { t } from "i18next";
import { BiPlus } from "react-icons/bi";
import { StoreConfigTable } from "./StoreConfigTable";
import StoreConfigModal from "../StoreConfigModal";
import removeTime from "../../../../utils/remove-time";

export default function StoresTable() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof RowType>("name");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const { storeList, rowsPerPage, setRowsPerPage, page, setPage, count } =
    storesStore();

  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    storeData: StoreType | null;
  }>({
    isOpen: false,
    storeData: null,
  });

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedRowName, setSelectedRowName] = useState<string | null>(null);
  const [storePercentage, setStorePercentage] = useState<number | null>(null);
  const [storeDayPay, setStoreDayPay] = useState<number>(0);

  const notifications = useNotifications();

  const handleRequestSort = (property: keyof StoreType) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    const newOrderDirection = isAsc ? "desc" : "asc";
    setOrderDirection(newOrderDirection);
    setOrderBy(property as keyof RowType);

    const sortedList = [...storeList].sort((a, b) => {
      const isAscOrder = newOrderDirection === "asc";
      if (property === "MKTP_NOM_NAM") {
        return (
          (a.MKTP_NOM_NAM < b.MKTP_NOM_NAM ? -1 : 1) * (isAscOrder ? 1 : -1)
        );
      }
      if (property === "MKTP_NAM_MKTPLC") {
        return (
          (a.MKTP_NAM_MKTPLC < b.MKTP_NAM_MKTPLC ? -1 : 1) *
          (isAscOrder ? 1 : -1)
        );
      }
      return 0;
    });

    storesStore.setState({ storeList: sortedList });
  };

  const handleRowSelect = (rowId: number, rowName: string) => {
    setSelectedRow(rowId);
    setSelectedRowName(rowName);
  };

  const openDeleteConfirmation = (
    rowId: number,
    rowName: string,
    percentage: number,
    dayPay: number
  ) => {
    setSelectedRow(rowId);
    setSelectedRowName(rowName);
    setStorePercentage(percentage);
    setStoreDayPay(dayPay);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (storeData: DeleteStorePayload) => {
    const requestMsg = await deleteStoreService(storeData);

    if (requestMsg) {
      notifications.show(
        `${storeData.pMKTP_NOM_NAM} ${t("Notifications.StoreDelete")}`,
        {
          severity: "success",
        }
      );
    } else {
      notifications.show(
        `${t("Notifications.StoreDeleteError")} ${storeData.pMKTP_NOM_NAM}`,
        {
          severity: "error",
        }
      );
    }
  };

  const handleConfirmDelete = async (
    storeId: number | null,
    storeName: string | null,
    storePercentage: number | null,
    storeDayPay: number
  ) => {
    if (typeof storeId === "number" && storeName && storePercentage !== null) {
      try {
        const storeData: DeleteStorePayload = {
          pMKTP_COD: storeId,
          pACAO: "E",
          pMKTP_NOM_NAM: storeName,
          pMKTP_VLR_PERCEN: storePercentage,
          pMKTP_INT_DAYPAY: storeDayPay,
          pMKTP_DAT_INIVIG: "",
          pMKTP_DAT_FIMVIG: "",
          pMKTP_VAL_MAR: 0,
          pMKTP_VAL_FLTRAT: 0,
          pMKTP_COD_MKT: 0,
        };

        await handleDelete(storeData);

        await storesStore
          .getState()
          .getStores(
            storesStore.getState().filters.marketplace,
            storesStore.getState().filters.searchValue,
            storesStore.getState().page * storesStore.getState().rowsPerPage,
            storesStore.getState().rowsPerPage
          );
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } else {
      console.warn(
        "ID de registro, nome da loja ou valor de pMKTP_VLR_PERCEN inválido"
      );
    }
    setOpenDeleteModal(false);
  };

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
        <StoresFilters showFilters={showFilters} />

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

      {open && <NewRegisterModal onClose={() => setOpen(false)} />}

      {editModal && (
        <EditStoreModal
          storeData={editModal.storeData as any}
          onClose={() =>
            setEditModal({
              isOpen: false,
              storeData: null,
            })
          }
        />
      )}

      {openDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={() =>
            handleConfirmDelete(
              selectedRow,
              selectedRowName,
              storePercentage,
              storeDayPay
            )
          }
        />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell
                sortDirection={orderBy === "name" ? orderDirection : false}
              >
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? orderDirection : "asc"}
                  onClick={() => handleRequestSort("MKTP_NOM_NAM")}
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
                  onClick={() => handleRequestSort("MKTP_NAM_MKTPLC")}
                >
                  {t("Common.Marketplace")}
                </TableSortLabel>
              </TableCell>
              <TableCell>{t("Stores.CreateDate")}</TableCell>
              <TableCell>{t("Stores.LastUpdate")}</TableCell>
              <TableCell>{t("Common.Actions")}</TableCell>
            </TableRow>

            {storeList.map((row) => (
              <ExpandedRow
                key={row.MKTP_COD}
                row={row}
                handleRowSelect={handleRowSelect}
                setEditModal={setEditModal}
                openDeleteConfirmation={openDeleteConfirmation}
              />
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
    </Box>
  );
}

const ExpandedRow = ({
  row,
  handleRowSelect,
  setEditModal,
  openDeleteConfirmation,
}: {
  row: StoreType;
  handleRowSelect: (rowId: number, rowName: string) => void;
  setEditModal: any;
  openDeleteConfirmation: any;
}) => {
  const [open, setOpen] = useState(false);
  const notifications = useNotifications();
  const [storeConfigs, setStoreConfigs] = useState<StoreConfigType[]>([]);

  const [storeConfigModalOpen, setStoreConfigModalOpen] = useState(false);

  const handleGetStoreConfigs = async () => {
    const response = await getStoreConfigService({ id: row.MKTP_COD });
    if (response.code === "error") {
      notifications.show("Erro ao buscar configurações da loja", {
        severity: "error",
      });
      return;
    }

    const formmatedData = response.data.data.records.map(
      (record: StoreConfigType) => {
        return {
          ...record,
          start_term: removeTime(record.start_term),
          end_term: removeTime(record.end_term),
        };
      }
    );

    setStoreConfigs(formmatedData);
  };

  useEffect(() => {
    if (open) {
      handleGetStoreConfigs();
    }
  }, [open]);

  return (
    <>
      {storeConfigModalOpen && (
        <StoreConfigModal
          onClose={() => setStoreConfigModalOpen(false)}
          storeId={row.MKTP_COD}
          row={defaultStoreConfig}
          refreshStoreConfig={handleGetStoreConfigs}
        />
      )}
      <TableRow
        key={row.MKTP_COD}
        onClick={() => handleRowSelect(row.MKTP_COD, row.MKTP_NOM_NAM)}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.MKTP_COD}</TableCell>
        <TableCell>{row.MKTP_NOM_NAM}</TableCell>
        <TableCell>{row.MKTP_NAM_MKTPLC}</TableCell>
        <TableCell>{formatTableDate(row.MKTP_DAT_CRE)}</TableCell>
        <TableCell>{formatTableDate(row.MKTP_DAT_UPD)}</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() =>
              setEditModal({
                isOpen: true,
                storeData: row,
              })
            }
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() =>
              openDeleteConfirmation(
                row.MKTP_COD,
                row.MKTP_NOM_NAM,
                row.MKTP_VLR_PERCEN,
                row.MKTP_INT_DAYPAY
              )
            }
            color="error"
          >
            <Delete color="warning"/>
          </IconButton>
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
              <Box>
                <Typography
                  variant="body2"
                  gutterBottom
                  fontWeight="600"
                  component="div"
                  style={{ borderBottom: `1px solid ${colors.green.main}` }}
                >
                  {t("Store_Details")}{" "}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BiPlus />}
                    onClick={() => setStoreConfigModalOpen(true)}
                  >
                    {t("New")}
                  </Button>
                </Typography>
              </Box>
              <StoreConfigTable
                storeConfig={storeConfigs}
                storeData={row}
                handleGetStoreConfigs={handleGetStoreConfigs}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

interface RowType {
  MKTP_NOM_NAM: string;
  MKTP_COD: number;
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
