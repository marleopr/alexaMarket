import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { t } from "i18next";
import { StoreConfigType } from "../../../../services/store/get-store-config";
import { shippingStore } from "../../ShippingStore";

interface StoreConfigSelectProps {
  value: number | string;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode
  ) => void;
  error?: boolean;
  disabled?: boolean;
}

const StoreConfigSelect = ({
  value,
  onChange,
  error,
  disabled,
}: StoreConfigSelectProps) => {
  const { storeConfigFromAnStoreList } = shippingStore();

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="Id-label">{t("storeConfig_Id")}</InputLabel>
      <Select
        labelId="Id-label"
        disabled={disabled}
        id="Id"
        value={value}
        label={t("storeConfig_Id")}
        onChange={onChange}
        error={error}
      >
        {storeConfigFromAnStoreList.map((row: StoreConfigType) => (
          <MenuItem key={row.Id} value={row.Id}>
            {row.Id}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StoreConfigSelect;
