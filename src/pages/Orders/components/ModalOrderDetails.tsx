import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import {
  getOrderDetailsService,
  OrderDetailsType,
} from "../../../services/orders/get-order-details-service";
import { Skeleton, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatTableDate } from "../../../utils/format-table-date";

interface ModalOrderDetailsProps {
  id: string;
  onClose: () => void;
}

const ModalOrderDetails = ({ id, onClose }: ModalOrderDetailsProps) => {
  const [data, setData] = useState<OrderDetailsType>();
  const { t } = useTranslation();

  useEffect(() => {
    getOrderDetailsService({
      Params: [
        {
          name: "PEDS_EXT_COD",
          value: id,
          condition: "=",
        },
      ],
    }).then((response) => {
      if (response.code === "success") {
        setData(response.data.data.records[0]);
      }
    });
  }, [id]);

  return (
    <div>
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!data ? (
          <Box sx={style}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Box>
        ) : (
          <>
            <Box sx={{ ...style, p: 4 }}>
              <Typography variant="h5">{t("Order Details")}</Typography>

              <Box mt={2}>
                <TextField
                  margin="dense"
                  value={data.PEDS_COD}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_COD")}
                  variant="outlined"
                  onChange={() => {}}
                />
              </Box>

              <Box display="flex" gap={1} mt={4}>
                <TextField
                  margin="dense"
                  value={data.PEDS_EXT_COD}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_EXT_COD")}
                  variant="outlined"
                  onChange={() => {}}
                />

                <TextField
                  margin="dense"
                  value={data.PEDS_STR_STAPED}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_STR_STAPED")}
                  variant="outlined"
                  onChange={() => {}}
                />
              </Box>
              <Box
                display="flex"
                gap={1}
                flexDirection="column"
                mt={2}
                maxWidth="425px"
              >
                <TextField
                  margin="dense"
                  value={formatTableDate(data.PEDS_DAT_DATPDS)}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_DAT_DATPDS")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={formatTableDate(data.PEDS_DAT_HRAPAG)}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_DAT_HRAPAG")}
                  variant="outlined"
                  onChange={() => {}}
                />
              </Box>
              <Box
                display="flex"
                gap={1}
                flexDirection="column"
                mt={4}
                maxWidth="425px"
              >
                <TextField
                  margin="dense"
                  value={data.PEDS_STL_NOMPRO}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_STL_NOMPRO")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={data.PEDS_VAL_PREORI}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_VAL_PREORI")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={data.PEDS_INT_QTD}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_INT_QTD")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={data.PEDS_VAL_TAXENVCOM}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_VAL_TAXENVCOM")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={data.PEDS_STR_NOMUSRCOM}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_STR_NOMUSRCOM")}
                  variant="outlined"
                  onChange={() => {}}
                />
              </Box>

              <Box
                display="flex"
                gap={1}
                flexDirection="column"
                mt={4}
                maxWidth="425px"
              >
                <TextField
                  margin="dense"
                  value={data.PEDS_STR_CID}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_STR_CID")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={data.PEDS_STR_BAI}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_STR_BAI")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={data.PEDS_STR_NUMRAS}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_STR_NUMRAS")}
                  variant="outlined"
                  onChange={() => {}}
                />
                <TextField
                  margin="dense"
                  value={data.PEDS_STR_OPSENV}
                  name="pMKTP_NOM_NAM"
                  label={t("PEDS_STR_OPSENV")}
                  variant="outlined"
                  onChange={() => {}}
                />
              </Box>
            </Box>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ModalOrderDetails;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "65%",
  overflow: "auto",
};
