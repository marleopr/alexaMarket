import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import { createData } from "./FilesTable";

interface UploadFileModalProps {
  open: boolean;
  onClose: () => void;
  onAddRegister: (newRow: ReturnType<typeof createData>) => void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  open,
  onClose,
  //onAddRegister,
}: UploadFileModalProps) => {
  const [
    ,
    //newRegister
    setNewRegister,
  ] = useState({
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

  /* const handleSubmit = () => {
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
  };*/

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload</DialogTitle>
      <DialogContent>
        <Input name="endOfTerm" type="file" fullWidth onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button
          onClick={
            //handleSubmit
            () => {}
          }
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileModal;
