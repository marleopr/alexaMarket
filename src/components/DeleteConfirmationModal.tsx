import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  const [buttonIsLoading, setButtonIsLoading] = React.useState(false);

  const handleConfirm = async () => {
    setButtonIsLoading(true);
    onConfirm();
    setTimeout(() => {
      setButtonIsLoading(false);
    }, 2000);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "300px",
        },
      }}
    >
      <DialogTitle>{t("Buttons.TitleDelete")}</DialogTitle>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="text"
          color="primary"
          disabled={buttonIsLoading}
        >
          {t("Buttons.No")}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={buttonIsLoading}
        >
          {t("Buttons.Yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
