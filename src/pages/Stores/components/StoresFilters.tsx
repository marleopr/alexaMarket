import { Box, Button, Collapse, FormControl, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { storesStore } from "../StoresStore";
import MarketplaceSelect from "../../../components/MarketplaceSelect";

const StoresFilters = ({ showFilters }: { showFilters: boolean }) => {
  const { t } = useTranslation();
  const { setPage, filters, setFilters } = storesStore();

  const handleApplyFilters = () => setPage(0);

  const handleClearFilters = () => {
    setFilters({ marketplace: "", searchValue: "" });
    setPage(0);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <Collapse in={showFilters} timeout="auto" unmountOnExit>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <MarketplaceSelect
            value={filters.marketplace}
            onChange={(e) =>
              setFilters({ ...filters, marketplace: e.target.value as number })
            }
          />

          <FormControl sx={{ minWidth: 200 }}>
            <TextField
              label={t("Common.Name")}
              variant="outlined"
              value={filters.searchValue}
              onChange={(e) =>
                setFilters({ ...filters, searchValue: e.target.value })
              }
              sx={{ minWidth: 200 }}
            />
          </FormControl>
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

export default StoresFilters;
