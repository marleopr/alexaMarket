import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { t } from "i18next";
import { StoreType } from "../../services/store/get-stores";
import { storesStore } from "../../pages/Stores/StoresStore";

interface StoreSelectProps {
  value: number | string;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode
  ) => void;
  error?: boolean;
  disabled?: boolean;
  options?: StoreType[];
}

const StoreSelect = ({
  value,
  onChange,
  error,
  disabled,
  options,
}: StoreSelectProps) => {
  const { storeList } = storesStore();
  const opts = options || storeList;

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="MKTP_COD-label">{t("StoresTitle")}</InputLabel>
      <Select
        disabled={disabled}
        labelId="MKTP_COD-label"
        id="MKTP_COD"
        value={value}
        label={t("StoresTitle")}
        onChange={onChange}
        error={error}
      >
        {opts.map((row: StoreType) => (
          <MenuItem key={row.MKTP_COD} value={row.MKTP_COD}>
            {row.MKTP_NOM_NAM}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StoreSelect;
