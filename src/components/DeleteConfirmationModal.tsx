import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
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
      <DialogTitle>Delete?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Não
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
