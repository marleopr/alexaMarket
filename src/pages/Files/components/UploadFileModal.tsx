import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { filesStore } from "../FilesStore";
import { useNotifications } from "@toolpad/core";
import { colors } from "../../../theme";
import { FileInput } from "../../../components/FileInput";
import { storesStore } from "../../Stores/StoresStore";

interface UploadFileModalProps {
  onClose: () => void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({
  onClose,
}: UploadFileModalProps) => {
  const { t } = useTranslation();
  const { getStores, storeList } = storesStore();
  const {
    createFile,
    getFiles,
    page,
    rowsPerPage,
    filters,
    createFileLoading,
  } = filesStore();
  const notifications = useNotifications();

  const [errors, setErrors] = useState({
    mktp_cod: false,
    files: false,
  });

  const [newRegister, setNewRegister] = useState<any>({
    mktp_cod: 0,
    files: [],
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("upfile", newRegister.files[0]);
    const responseStatus = await createFile({
      formData,
      MKTP_COD: newRegister.mktp_cod,
    });

    if (responseStatus === 200) {
      getFiles(
        filters.mktp_cod,
        filters.name,
        filters.date_start,
        filters.date_end,
        filters.type,
        filters.error,
        page,
        rowsPerPage
      );
      notifications.show(t("Files.UploadSuccess"), {
        severity: "success",
      });
      return onClose();
    }
  };

  const validateInputs = () => {
    const errs: { [key: string]: boolean } = {
      mktp_cod: false,
    };

    if (newRegister.mktp_cod === 0) {
      errs.mktp_cod = true;
    }

    if (newRegister.files.length === 0) {
      errs.files = true;
    }

    setErrors((prev) => ({ ...prev, ...errs }));

    if (Object.values(errs).some((err) => err)) {
      return;
    }

    handleSubmit();
  };

  useEffect(() => {
    getStores("", "", 0, 1000);
  }, []);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{t("Files.UploadFileTitle")}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <FormControl sx={{ minWidth: "100%" }} margin="dense">
            <InputLabel id="store-label">
              {t("Common.Store")}
            </InputLabel>
            <Select
              name="mktp_cod"
              labelId="store-label"
              id="store"
              value={newRegister.mktp_cod}
              label={t("Common.Store")}
              required
              fullWidth
              error={errors.mktp_cod}
              onChange={(e) =>
                setNewRegister({
                  ...newRegister,
                  mktp_cod: e.target.value as number,
                })
              }
            >
              {storeList.map((row) => (
                <MenuItem key={row.MKTP_COD} value={row.MKTP_COD}>
                  {row.MKTP_NOM_NAM}
                </MenuItem>
              ))}
            </Select>
            <Typography
              variant="caption"
              style={{ color: colors.red.error, margin: "3px 0 0 14px" }}
            >
              {errors.mktp_cod ? t("Common.Required") : ""}
            </Typography>
          </FormControl>

          <FileInput
            hasFile={newRegister.files.length > 0}
            selectedFile={newRegister.files[0]}
            accept=".xlsx, .xls"
            multiple={false}
            onFileSelect={(files) => {
              setNewRegister({
                ...newRegister,
                files: files,
              });
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="text"
          color="primary"
          disabled={createFileLoading}
        >
          {t("Buttons.Cancel")}
        </Button>
        <Button
          onClick={validateInputs}
          variant="contained"
          color="primary"
          disabled={createFileLoading}
        >
          {t("Buttons.Upload")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileModal;
