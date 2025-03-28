import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { ordersStore } from "../OrdersStore";
import StoreSelect from "../../../components/StoreSelect";
import DateSelect from "../../../components/DateSelect";

const statusList = ["PENDING", "VERIFY", "PAID"];

const OrdersFilters = ({ showFilters }: { showFilters: boolean }) => {
  const { t } = useTranslation();
  const { setPage, filters, setFilters } = ordersStore();

  const handleApplyFilters = () => setPage(0);

  const handleClearFilters = () => {
    setFilters({
      mktp_cod: "",
      PEDS_STR_STAPAG: "",
      date_start: "",
      date_end: "",
    });
    setPage(0);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <Collapse in={showFilters} timeout="auto" unmountOnExit>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="flex-end">
          <StoreSelect
            value={filters.mktp_cod}
            onChange={(e) =>
              setFilters({ ...filters, mktp_cod: e.target.value as number })
            }
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="status-label">{t("Status")}</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={filters.PEDS_STR_STAPAG}
              label={t("Status")}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  PEDS_STR_STAPAG: e.target.value as string,
                })
              }
            >
              {statusList.map((row) => (
                <MenuItem key={row} value={row}>
                  {t(`${row}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DateSelect
            label={t("Filters.OrderStart")}
            value={filters.date_start}
            onChange={(e) =>
              setFilters({ ...filters, date_start: e.target.value })
            }
          />

          <DateSelect
            label={t("Filters.OrderEnd")}
            value={filters.date_end}
            onChange={(e) =>
              setFilters({ ...filters, date_end: e.target.value })
            }
          />

          <Button variant="contained" onClick={handleApplyFilters}>
            {t("Apply")}
          </Button>
          <Button variant="text" onClick={handleClearFilters}>
            {t("Common.ClearFilters")}
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default OrdersFilters;
