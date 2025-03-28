import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { appStore } from "../../../store/ApplicationStore";
import { storesStore } from "../StoresStore";
import { EditStorePayload } from "../../../services/store/edit-store";
import { MarketPlacesType } from "../../../services/marketplaces/get-market-places";
import { useNotifications } from "@toolpad/core";
import { StoreType } from "../../../services/store/get-stores";
import { formatModalTable } from "../../../utils/format-modal-table";


interface EditRegisterModalProps {
  onClose: () => void;
  storeData: StoreType | null;
}

const EditStoreModal: React.FC<EditRegisterModalProps> = ({
  onClose,
  storeData,
}: EditRegisterModalProps) => {
  if (!storeData) {
    return null;
  }

  const { t } = useTranslation();
  const { marketplaceList, getMarketplaces } = appStore();
  const { editStore, getStores, page, rowsPerPage, filters, editStoreLoading } =
    storesStore();
  const notifications = useNotifications();

  const [register, setRegister] = useState<EditStorePayload>({
    pACAO: "A",
    pMKTP_COD: storeData.MKTP_COD,
    pMKTP_COD_MKT: storeData.MKTP_COD_MKT,
    pMKTP_NOM_NAM: storeData.MKTP_NOM_NAM,
    pMKTP_VLR_PERCEN: storeData.MKTP_VLR_PERCEN,
    pMKTP_DAT_INIVIG: formatModalTable(storeData.MKTP_DAT_INIVIG),
    pMKTP_DAT_FIMVIG: formatModalTable(storeData.MKTP_DAT_FIMVIG),
    pMKTP_VAL_FLTRAT: storeData.MKTP_VAL_FLTRAT,
    pMKTP_VAL_MAR: storeData.MKTP_VAL_MAR,
    pMKTP_INT_DAYPAY: storeData.MKTP_INT_DAYPAY,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requestMsg = await editStore(register);

    if (requestMsg) {
      notifications.show(requestMsg, {
        severity: "error",
      });
    } else {
      await getStores(
        filters.marketplace,
        filters.searchValue,
        page,
        rowsPerPage
      );
      notifications.show(t("Notifications.StoreUpdated"), {
        severity: "success",
      });
      onClose();
    }
  };

  useEffect(() => {
    getMarketplaces();
  }, []);

  const [errors, setErrors] = useState({
    pMKTP_NOM_NAM: false,
    pMKTP_COD_MKT: false,
  });

  const validateInputs = () => {
    let errs: any = {
      pMKTP_NOM_NAM: false,
      pMKTP_COD_MKT: false,
    
    };

    if (!register.pMKTP_NOM_NAM) {
      errs.pMKTP_NOM_NAM = true;
    }
    if (register.pMKTP_COD_MKT === 0) {
      errs.pMKTP_COD_MKT = true;
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
        {t("Common.Store")} - {register.pMKTP_COD}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t("EditNewRegister")}</DialogContentText>

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
          <FormControl>
            <TextField
              margin="dense"
              value={register.pMKTP_NOM_NAM}
              name="pMKTP_NOM_NAM"
              autoFocus
              label={t("Common.Name")}
              fullWidth
              variant="outlined"
              required
              onChange={handleChange}
              error={errors.pMKTP_NOM_NAM}
              helperText={
                errors.pMKTP_NOM_NAM ? t("Common.Required") : undefined
              }
            />
          </FormControl>
          <FormControl sx={{ minWidth: "100%" }} margin="dense">
            <InputLabel id="marketplace-label">
              {t("Common.Marketplace")}
            </InputLabel>
            <Select
              name="pMKTP_COD_MKT"
              labelId="marketplace-label"
              id="marketplace"
              value={register.pMKTP_COD_MKT}
              label={t("Common.Marketplace")}
              required
              fullWidth
              error={errors.pMKTP_COD_MKT}
              onChange={(e) =>
                setRegister({
                  ...register,
                  pMKTP_COD_MKT: e.target.value as number,
                })
              }
            >
              {marketplaceList.map((row: MarketPlacesType) => (
                <MenuItem key={row.Codigo} value={row.Codigo}>
                  {row.Nome}
                </MenuItem>
              ))}
            </Select>
            <Typography
              variant="caption"
              style={{ color: "#d32f2f", margin: "3px 0 0 14px" }}
            >
              {errors.pMKTP_COD_MKT ? t("Common.Required") : ""}
            </Typography>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="text"
          color="primary"
          disabled={editStoreLoading}
        >
          {t("Buttons.Cancel")}
        </Button>
        <Button
          onClick={validateInputs}
          variant="contained"
          color="primary"
          disabled={editStoreLoading}
        >
          {t("Buttons.Save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStoreModal;
