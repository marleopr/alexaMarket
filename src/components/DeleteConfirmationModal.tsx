import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (storeId: number | null) => void; 
  storeId: number | null;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  storeId,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "300px",
        },
      }}
    >
      <DialogTitle>{t("Buttons.TitleDelete")}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
        {t("Buttons.No")}
        </Button>
        <Button
          onClick={() => onConfirm(storeId)}
          variant="contained"
          color="error"
        >
           {t("Buttons.Yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
