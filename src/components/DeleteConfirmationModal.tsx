import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

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
      <DialogTitle>Deseja deletar este item?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Não
        </Button>
        <Button
          onClick={() => onConfirm(storeId)}
          variant="contained"
          color="error"
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
