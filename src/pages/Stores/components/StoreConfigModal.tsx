import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNotifications } from "@toolpad/core";
import { StoreConfigType } from "../../../services/store/get-store-config";
import { editStoreConfigService } from "../../../services/store/edit-store-config";

interface StoreConfigModalProps {
  onClose: () => void;
  row: StoreConfigType;
  storeId: number;
  refreshStoreConfig: () => void;
}

const StoreConfigModal: React.FC<StoreConfigModalProps> = ({
  onClose,
  row,
  storeId,
  refreshStoreConfig,
}: StoreConfigModalProps) => {
  const { t } = useTranslation();
  const notifications = useNotifications();

  const [register, setRegister] = useState<StoreConfigType>(row);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await editStoreConfigService({
      pMKTP_DAT_INIVIG: register.start_term.replace("T", " "),
      pMKTP_DAT_FIMVIG: register.end_term.replace("T", " "),
      pMKTP_VAL_MAR: register.margin,
      pMKTP_VAL_FLTRAT: register.flat_rate,
      pMKTP_VLR_PERCEN: register.percent,
      pMKTP_INT_DAYPAY: register.payment_day,
      pACAO: register.Id ? "A" : "I",
      pID: register.Id,
      pMKTP_COD: storeId,
    });

    if (res.code !== "success") {
      notifications.show(res.error as unknown as string, {
        severity: "error",
      });
      return;
    }

    refreshStoreConfig();
    notifications.show(t("Notifications.StoreUpdated"), {
      severity: "success",
    });
    onClose();
  };

  type Errors = {
    start_term: boolean;
    end_term: boolean;
  };

  const [errors, setErrors] = useState<Errors>({
    start_term: false,
    end_term: false,
  });

  const validateInputs = () => {
    let errs: Errors = {
      start_term: false,
      end_term: false,
    };

    if (!register.start_term) {
      errs = { ...errs, start_term: true };
    }
    if (!register.end_term) {
      errs = { ...errs, end_term: true };
    }

    setErrors((prev) => ({ ...prev, ...errs }));

    if (Object.values(errs).some((err) => err)) {
      return;
    }
    console.error(errs);
    handleSubmit();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {register.Id ? `${t("Common.Store")} - ${register.Id}` : ""}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="start_term"
            value={register.start_term}
            onChange={handleChange}
            error={errors.start_term}
            label={t("start_term")}
            type="date"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            name="end_term" //fee
            value={register.end_term}
            onChange={handleChange}
            error={errors.end_term}
            label={t("end_term")}
            type="date"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="percent" //fee
            value={register.percent}
            onChange={handleChange}
            label={t("Fee")}
            type="number"
            margin="dense"
          />
          <TextField
            name="flat_rate"
            value={register.flat_rate}
            onChange={handleChange}
            label={t("FlatRate")}
            type="number"
            margin="dense"
          />
          <TextField
            name="payment_day"
            value={register.payment_day}
            onChange={handleChange}
            label={t("Days_to_payment")}
            type="number"
            margin="dense"
          />
          <TextField
            name="margin"
            value={register.margin}
            onChange={handleChange}
            label={t("margin")}
            type="number"
            margin="dense"
          />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        ></Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" color="primary">
          {t("Buttons.Cancel")}
        </Button>
        <Button onClick={validateInputs} variant="contained" color="primary">
          {t("Buttons.Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreConfigModal;
