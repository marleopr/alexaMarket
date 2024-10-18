import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { createData } from "./MarketplacesTable";

interface NewRegisterModalProps {
  open: boolean;
  onClose: () => void;
  onAddRegister: (newRow: ReturnType<typeof createData>) => void;
}

const NewRegisterModal: React.FC<NewRegisterModalProps> = ({
  open,
  onClose,
  onAddRegister,
}: NewRegisterModalProps) => {
  const [newRegister, setNewRegister] = useState({
    id: "",
    name: "",
    type: "",
    percentage: "",
    marginError: "",
    flatRate: "",
    daysForPayment: "",
    startOfTerm: "",
    endOfTerm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newRow = createData(
      Number(newRegister.id),
      newRegister.name,
      newRegister.type,
      Number(newRegister.percentage),
      Number(newRegister.marginError),
      Number(newRegister.flatRate),
      Number(newRegister.daysForPayment),
      newRegister.startOfTerm,
      newRegister.endOfTerm
    );

    onAddRegister(newRow);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the details for the new register.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="id"
          label="ID"
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="name"
          label="Name"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="type"
          label="Type"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="percentage"
          label="Comission"
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="marginError"
          label="Margin Error"
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="flatRate"
          label="Flat Rate"
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="daysForPayment"
          label="Days for Payment"
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="startOfTerm"
          label="Start of Term"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="endOfTerm"
          label="End of Term"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewRegisterModal;
