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
import { CreateStorePayload } from "../../../services/store/create-store";
import { MarketPlacesType } from "../../../services/marketplaces/get-market-places";
import { useNotifications } from "@toolpad/core";
import { formatModalTable } from "../../../utils/format-modal-table";

interface NewRegisterModalProps {
  onClose: () => void;
}




const NewRegisterModal: React.FC<NewRegisterModalProps> = ({
  onClose,
}: NewRegisterModalProps) => {
  const { t } = useTranslation();
  const { marketplaceList, getMarketplaces } = appStore();
  const {
    createStore,
    getStores,
    page,
    rowsPerPage,
    filters,
    createStoreLoading,
  } = storesStore();
  const notifications = useNotifications();

  const [newRegister, setNewRegister] = useState<CreateStorePayload>({
    pMKTP_COD: null,
    pACAO: "I",
    pMKTP_COD_MKT: 0,
    pMKTP_DAT_FIMVIG: formatModalTable(new Date().toISOString()),
    pMKTP_DAT_INIVIG: formatModalTable(new Date().toISOString()),
    pMKTP_INT_DAYPAY: 0,
    pMKTP_NOM_NAM: "",
    pMKTP_VAL_FLTRAT: 0,
    pMKTP_VAL_MAR: 0,
    pMKTP_VLR_PERCEN: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const requestMsg = await createStore(newRegister);

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
      notifications.show(t("Notifications.StoreCreated"), {
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
    pMKTP_DAT_INIVIG: false,
    pMKTP_DAT_FIMVIG: false,
  });

  const validateInputs = () => {
    let errs: any = {
      pMKTP_NOM_NAM: false,
      pMKTP_COD_MKT: false,
      pMKTP_DAT_INIVIG: false,
      pMKTP_DAT_FIMVIG: false,
    };

    if (!newRegister.pMKTP_NOM_NAM) {
      errs.pMKTP_NOM_NAM = true;
    }
    if (newRegister.pMKTP_COD_MKT === 0) {
      errs.pMKTP_COD_MKT = true;
    }
    if (!newRegister.pMKTP_DAT_INIVIG) {
      errs.pMKTP_DAT_INIVIG = true;
    }
    if (!newRegister.pMKTP_DAT_FIMVIG) {
      errs.pMKTP_DAT_FIMVIG = true;
    }

    setErrors((prev) => ({ ...prev, ...errs }));

    if (Object.values(errs).some((err) => err)) {
      return;
    }
    console.log(errs);
    handleSubmit();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{t("AddNewRegister.AddNewRegister")}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t("AddNewRegister.Dialog")}</DialogContentText>

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
              value={newRegister.pMKTP_NOM_NAM}
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
          <FormControl>
            <TextField
              margin="dense"
              name="pMKTP_VLR_PERCEN"
              value={newRegister.pMKTP_VLR_PERCEN}
              label={t("Common.Commission")}
              type="number"
              fullWidth
              variant="outlined"
              onChange={handleChange}
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
              value={newRegister.pMKTP_COD_MKT}
              label={t("Common.Marketplace")}
              required
              fullWidth
              error={errors.pMKTP_COD_MKT}
              onChange={(e) =>
                setNewRegister({
                  ...newRegister,
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

        <TextField
          margin="dense"
          name="pMKTP_VAL_FLTRAT"
          value={newRegister.pMKTP_VAL_FLTRAT}
          label={t("Marketplaces.FlatRate")}
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="pMKTP_VAL_MAR"
          value={newRegister.pMKTP_VAL_MAR}
          label={t("Marketplaces.MarginError")}
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />

        <TextField
          margin="dense"
          name="pMKTP_INT_DAYPAY"
          value={newRegister.pMKTP_INT_DAYPAY}
          label={t("Marketplaces.DaysForPayment")}
          type="number"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          value={newRegister.pMKTP_DAT_INIVIG}
          label={t("Marketplaces.StartOfTerm")}
          type="date"
          name="pMKTP_DAT_INIVIG"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={handleChange}
          error={errors.pMKTP_DAT_INIVIG}
          helperText={errors.pMKTP_DAT_INIVIG ? t("Common.Required") : ""}
        />
        <TextField
          value={newRegister.pMKTP_DAT_FIMVIG}
          margin="dense"
          name="pMKTP_DAT_FIMVIG"
          label={t("Marketplaces.EndOfTerm")}
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={handleChange}
          error={errors.pMKTP_DAT_FIMVIG}
          helperText={errors.pMKTP_DAT_FIMVIG ? t("Common.Required") : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="text"
          color="primary"
          disabled={createStoreLoading}
        >
          {t("Buttons.Cancel")}
        </Button>
        <Button
          onClick={validateInputs}
          variant="contained"
          color="primary"
          disabled={createStoreLoading}
        >
          {t("Buttons.Add")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewRegisterModal;
