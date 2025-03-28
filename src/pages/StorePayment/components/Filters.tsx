import { Box, Button, Collapse, TextField } from "@mui/material";

import { useTranslation } from "react-i18next";
import { storePaymentStore } from "../StorePaymentStore";
import StoreSelect from "../../../components/StoreSelect";

const Filters = ({ showFilters }: { showFilters: boolean }) => {
  const { t } = useTranslation();
  const { setPage, filters, setFilters } = storePaymentStore();

  const handleApplyFilters = () => setPage(0);

  const handleClearFilters = () => {
    setFilters({
      mktp_cod: "",
      date_start: "",
      date_end: "",
    });
    setPage(0);
  };

  const handleDownloadFiles = () => {};

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

          <TextField
            id="order-start"
            label={t("Filters.OrderStart")}
            type="date"
            value={filters.date_start}
            onChange={(e) =>
              setFilters({ ...filters, date_start: e.target.value })
            }
            sx={{ minWidth: 200 }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            id="order-end"
            label={t("Filters.OrderEnd")}
            type="date"
            value={filters.date_end}
            onChange={(e) =>
              setFilters({ ...filters, date_end: e.target.value })
            }
            sx={{ minWidth: 200 }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <Button variant="contained" onClick={handleApplyFilters}>
            {t("Apply")}
          </Button>
          <Button variant="text" onClick={handleClearFilters}>
            {t("Common.ClearFilters")}
          </Button>
          <Button variant="contained" onClick={handleDownloadFiles}>
            {t("Common.Download")}
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Filters;
