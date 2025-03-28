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
import { useTranslation } from "react-i18next";
import { filesStore } from "../FilesStore";
import StoreSelect from "../../../components/StoreSelect";

const trueFalseOptions = [
  { label: "All", value: "" },
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

const FilesFilters = ({ showFilters }: { showFilters: boolean }) => {
  const { t } = useTranslation();
  const { setPage, filters, setFilters, fileTypeList } = filesStore();

  const handleApplyFilters = () => setPage(0);

  const handleClearFilters = () => {
    setFilters({
      mktp_cod: "",
      name: "",
      type: "",
      date_start: "",
      date_end: "",
      error: "",
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
            <TextField
              label={t("Common.Name")}
              variant="outlined"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              sx={{ minWidth: 200 }}
            />
          </FormControl>

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

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="type-label">{t("Common.Type")}</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={filters.type}
              label={t("Common.Marketplace")}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  type: e.target.value as string,
                })
              }
            >
              {fileTypeList.map((row) => (
                <MenuItem key={row.type} value={row.type}>
                  {row.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="error-label">{t("Error")}</InputLabel>
            <Select
              labelId="error-label"
              id="error"
              value={filters.error}
              label={t("Common.Marketplace")}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  error: e.target.value as string,
                })
              }
            >
              {trueFalseOptions.map((row) => (
                <MenuItem key={row.value} value={row.value}>
                  {t(row.label)}
                </MenuItem>
              ))}
            </Select>
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

export default FilesFilters;
