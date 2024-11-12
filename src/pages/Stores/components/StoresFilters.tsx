import {
  Box,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { appStore } from "../../../store/ApplicationStore";
import { MarketPlacesType } from "../../../services/marketplaces/get-market-places";
import { useTranslation } from "react-i18next";
import { storesStore } from "../StoresStore";

const StoresFilters = ({ showFilters }: { showFilters: boolean }) => {
  const { marketplaceList } = appStore();
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
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="marketplace-label">
              {t("Common.Marketplace")}
            </InputLabel>
            <Select
              labelId="marketplace-label"
              id="marketplace"
              value={filters.marketplace}
              label={t("Common.Marketplace")}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  marketplace: e.target.value as number,
                })
              }
            >
              {marketplaceList.map((row: MarketPlacesType) => (
                <MenuItem key={row.Codigo} value={row.Codigo}>
                  {row.Nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
