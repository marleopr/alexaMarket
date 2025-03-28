import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { t } from "i18next";
import { appStore } from "../../store/ApplicationStore";
import { MarketPlacesType } from "../../services/marketplaces/get-market-places";

interface MarketplaceSelectProps {
  value: number | string;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode
  ) => void;
  error?: boolean;
}

const MarketplaceSelect = ({
  value,
  onChange,
  error,
}: MarketplaceSelectProps) => {
  const { marketplaceList } = appStore();

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="marketplace-label">{t("Common.Marketplace")}</InputLabel>
      <Select
        error={error}
        labelId="marketplace-label"
        id="marketplace"
        value={value}
        label={t("Common.Marketplace")}
        onChange={onChange}
      >
        {marketplaceList.map((row: MarketPlacesType) => (
          <MenuItem key={row.Codigo} value={row.Codigo}>
            {row.Nome}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MarketplaceSelect;
