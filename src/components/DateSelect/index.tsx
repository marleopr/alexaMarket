import { TextField } from "@mui/material";
import { t } from "i18next";

interface DateSelectProps {
  value: number | string;
  label: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: boolean;
}

const DateSelect = ({ value, onChange, label, error }: DateSelectProps) => {
  return (
    <TextField
      id={label}
      label={t(`${label}`)}
      type="date"
      value={value}
      onChange={onChange}
      error={!!error}
      sx={{ minWidth: 200 }}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
    />
  );
};

export default DateSelect;
