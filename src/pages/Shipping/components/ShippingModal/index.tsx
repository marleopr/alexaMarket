import React, { useEffect, useState } from "react";
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
import { shippingStore } from "../../ShippingStore";

import { useNotifications } from "@toolpad/core";

import {
  defaultShipping,
  ShippingType,
} from "../../../../services/shipping/get-shipping";
import StoreSelect from "../../../../components/StoreSelect";
import StoreConfigSelect from "./StoreConfigSelect";
import DateSelect from "../../../../components/DateSelect";
import { Errors } from "./types";
import { validate } from "./validation";
import { putShippingService } from "../../../../services/shipping/put-shipping";
import { formatter } from "./formatter";

interface ShippingModalProps {
  onClose: () => void;
  data?: ShippingType;
}

const ShippingModal: React.FC<ShippingModalProps> = ({
  onClose,
  data,
}: ShippingModalProps) => {
  const { t } = useTranslation();
  const notifications = useNotifications();

  const {
    getStoreConfigFromAnStore,
    clearStoreConfigFromAnStore,
    getShipping,
  } = shippingStore();

  const [newRegister, setNewRegister] = useState<ShippingType>(
    data || defaultShipping
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    MKTP_COD: false,
    storeConfig_Id: false,
    name: false,
    start_track: false,
    end_track: false,
    value: false,
    start_term: false,
    end_term: false,
  });

  const handleChange = (name: string, value: any) => {
    setNewRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const errors = validate(newRegister);

    setErrors(errors);
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    setLoading(true);

    const formattedPayload = formatter(
      newRegister,
      newRegister.shipping_id ? "A" : "I"
    );

    const response = await putShippingService(formattedPayload);

    setLoading(false);

    if (response.code !== "success") {
      notifications.show(response.error as unknown as string, {
        severity: "error",
      });
      return;
    }

    notifications.show(t("Success"), {
      severity: "success",
    });

    getShipping();

    onClose();
  };

  useEffect(() => {
    if (newRegister.MKTP_COD !== null) {
      getStoreConfigFromAnStore(newRegister.MKTP_COD);
    }

    return () => {
      clearStoreConfigFromAnStore();
    };
  }, [newRegister.MKTP_COD]);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        {newRegister.shipping_id ? t("EditRegister") : t("AddNewRegister.AddNewRegister")}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={4} mt={2}>
          <StoreSelect
            value={newRegister.MKTP_COD as number}
            onChange={(e) => {
              handleChange("MKTP_COD", e.target.value);
              handleChange("storeConfig_Id", null);
            }}
            error={errors.MKTP_COD}
            disabled={data?.shipping_id !== undefined}
          />

          {newRegister.MKTP_COD !== null && (
            <StoreConfigSelect
              value={newRegister.storeConfig_Id as number}
              onChange={(e) => handleChange("storeConfig_Id", e.target.value)}
              error={errors.storeConfig_Id}
              disabled={data?.shipping_id !== undefined}
            />
          )}

          <TextField
            label={t("name")}
            value={newRegister.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
          />

          <TextField
            value={newRegister.start_track}
            onChange={(e) => handleChange("start_track", e.target.value)}
            label={t("start_track")}
            type="number"
            error={errors.start_track}
          />

          <TextField
            value={newRegister.end_track}
            onChange={(e) => handleChange("end_track", e.target.value)}
            label={t("end_track")}
            type="number"
            error={errors.end_track}
          />

          <TextField
            value={newRegister.value}
            onChange={(e) => handleChange("value", e.target.value)}
            label={t("value")}
            type="number"
            error={errors.value}
          />

          <DateSelect
            value={newRegister.start_term}
            onChange={(e) => handleChange("start_term", e.target.value)}
            label={t("start_term")}
            error={errors.start_term}
          />

          <DateSelect
            value={newRegister.end_term}
            onChange={(e) => handleChange("end_term", e.target.value)}
            label={t("end_term")}
            error={errors.end_term}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="text"
          color="primary"
          disabled={loading}
        >
          {t("Buttons.Cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {t("Buttons.Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShippingModal;
