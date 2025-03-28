// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import { appStore } from "../../../store/ApplicationStore";
// import { storesStore } from "../StoresStore";
// import { CreateStorePayload } from "../../../services/store/create-store";
// import { MarketPlacesType } from "../../../services/marketplaces/get-market-places";

// interface NewRegisterModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// const NewRegisterModal: React.FC<NewRegisterModalProps> = ({
//   open,
//   onClose,
// }: NewRegisterModalProps) => {
//   const { t } = useTranslation();
//   const { marketplaceList, getMarketplaces } = appStore();
//   const { createStore } = storesStore();

//   const [newRegister, setNewRegister] = useState<CreateStorePayload>({
//     pACAO: "I",
//     pMKTP_COD_MKT: 0,
//     pMKTP_DAT_FIMVIG: "",
//     pMKTP_DAT_INIVIG: "",
//     pMKTP_INT_DAYPAY: 0,
//     pMKTP_NOM_NAM: "",
//     pMKTP_STR_NAM: "teste",
//     pMKTP_VAL_FLTRAT: 0,
//     pMKTP_VAL_MAR: 0,
//     pMKTP_VLR_PERCEN: 0,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewRegister((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     createStore(newRegister);
//   };

//   useEffect(() => {
//     getMarketplaces();
//   }, []);

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>{t("AddNewRegister.AddNewRegister")}</DialogTitle>
//       <DialogContent>
//         <DialogContentText>{t("AddNewRegister.Dialog")}</DialogContentText>
//         <TextField
//           margin="dense"
//           value={newRegister.pMKTP_NOM_NAM}
//           name="pMKTP_NOM_NAM"
//           label={t("Common.Name")}
//           fullWidth
//           variant="outlined"
//           onChange={handleChange}
//         />
//         <FormControl sx={{ minWidth: "100%" }} margin="dense">
//           <InputLabel id="marketplace-label">
//             {t("Common.Marketplace")}
//           </InputLabel>
//           <Select
//             name="pMKTP_COD_MKT"
//             labelId="marketplace-label"
//             id="marketplace"
//             value={newRegister.pMKTP_COD_MKT}
//             label={t("Common.Marketplace")}
//             fullWidth
//             onChange={(e) =>
//               setNewRegister({
//                 ...newRegister,
//                 pMKTP_COD_MKT: e.target.value as number,
//               })
//             }
//           >
//             {marketplaceList.map((row: MarketPlacesType) => (
//               <MenuItem key={row.Codigo} value={row.Codigo}>
//                 {row.Nome}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <TextField
//           margin="dense"
//           name="pMKTP_VLR_PERCEN"
//           value={newRegister.pMKTP_VLR_PERCEN}
//           label={t("Common.Type")}
//           type="number"
//           fullWidth
//           variant="outlined"
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="pMKTP_VAL_FLTRAT"
//           value={newRegister.pMKTP_VAL_FLTRAT}
//           label={t("Marketplaces.FlatRate")}
//           type="number"
//           fullWidth
//           variant="outlined"
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="pMKTP_VAL_MAR"
//           value={newRegister.pMKTP_VAL_MAR}
//           label={t("Marketplaces.MarginError")}
//           type="number"
//           fullWidth
//           variant="outlined"
//           onChange={handleChange}
//         />

//         <TextField
//           margin="dense"
//           name="pMKTP_INT_DAYPAY"
//           value={newRegister.pMKTP_INT_DAYPAY}
//           label={t("Marketplaces.DaysForPayment")}
//           type="number"
//           fullWidth
//           variant="outlined"
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           value={newRegister.pMKTP_DAT_INIVIG}
//           label={t("Marketplaces.StartOfTerm")}
//           type="date"
//           name="pMKTP_DAT_INIVIG"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           variant="outlined"
//           onChange={handleChange}
//         />
//         <TextField
//           value={newRegister.pMKTP_DAT_FIMVIG}
//           margin="dense"
//           name="pMKTP_DAT_FIMVIG"
//           label={t("Marketplaces.EndOfTerm")}
//           type="date"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           variant="outlined"
//           onChange={handleChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} variant="contained" color="primary">
//           {t("Buttons.Cancel")}
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" color="primary">
//           {t("Buttons.Add")}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default NewRegisterModal;
