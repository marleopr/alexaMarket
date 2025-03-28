import { Box, Button, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { shippingStore } from "../ShippingStore";
import { Add, FilterAlt, FilterAltOff } from "@mui/icons-material";
import StoreSelect from "../../../components/StoreSelect";
import MarketplaceSelect from "../../../components/MarketplaceSelect";
import { useEffect, useState } from "react";
import {
  getStoresService,
  StoreType,
} from "../../../services/store/get-stores";

interface FiltersProps {
  openModal: () => void;
}

const Filters = ({ openModal }: FiltersProps) => {
  const { t } = useTranslation();
  const { filters, changeAnyStoreValues } = shippingStore();
  const [showFilters, setShowFilters] = useState(true);

  const [
    storeOptionsFilteredByMarketplace,
    setStoreOptionsFilteredByMarketplace,
  ] = useState<StoreType[]>([]);

  const [localFiltersValues, setLocalFiltersValues] = useState(filters);

  const [errors, setErrors] = useState({
    MKTP_COD: false,
    MKTP_COD_MKT: false,
  });

  const handleValidateFields = () => {
    const errors = {
      MKTP_COD: false,
      MKTP_COD_MKT: false,
    };
    if (localFiltersValues.MKTP_COD_MKT === "") {
      errors.MKTP_COD_MKT = true;
    }
    if (localFiltersValues.MKTP_COD === "") {
      errors.MKTP_COD = true;
    }
    setErrors(errors);
    return errors;
  };

  const handleApplyFilters = () => {
    const err = handleValidateFields();
    if (err.MKTP_COD || err.MKTP_COD_MKT) {
      return;
    }

    changeAnyStoreValues({
      filters: localFiltersValues,
      page: 0,
    });
  };

  const handleClearFilters = () => {
    setLocalFiltersValues({ MKTP_COD: "", MKTP_COD_MKT: "" });
    changeAnyStoreValues({
      filters: { MKTP_COD: "", MKTP_COD_MKT: "" },
      page: 0,
    });
  };

  useEffect(() => {
    if (localFiltersValues.MKTP_COD_MKT !== "") {
      handleGetStores();
    }
  }, [localFiltersValues.MKTP_COD_MKT]);

  const handleGetStores = async () => {
    const params = [
      {
        name: "Offset",
        value: "0",
        condition: "=",
      },
      {
        name: "Limit",
        value: "999",
        condition: "=",
      },
      {
        name: "MKTP_COD_MKT",
        value: localFiltersValues.MKTP_COD_MKT as string,
        condition: "=",
      },
    ];

    const response = await getStoresService({
      Params: params as any,
    });

    if (response.code === "error") {
      return;
    }
    setStoreOptionsFilteredByMarketplace(response.data.data.records);
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Collapse in={showFilters} timeout="auto" unmountOnExit>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <MarketplaceSelect
              error={errors.MKTP_COD_MKT}
              value={localFiltersValues.MKTP_COD_MKT}
              onChange={(e) =>
                setLocalFiltersValues({
                  ...localFiltersValues,
                  MKTP_COD_MKT: e.target.value as string,
                })
              }
            />

            <StoreSelect
              error={errors.MKTP_COD}
              options={storeOptionsFilteredByMarketplace}
              value={localFiltersValues.MKTP_COD}
              onChange={(e) =>
                setLocalFiltersValues({
                  ...localFiltersValues,
                  MKTP_COD: e.target.value as number,
                })
              }
            />

            <Button variant="contained" onClick={handleApplyFilters}>
              {t("Apply")}
            </Button>
            <Button variant="text" onClick={handleClearFilters}>
              {t("Common.ClearFilters")}
            </Button>
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton
          color="primary"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? <FilterAltOff /> : <FilterAlt />}
        </IconButton>
        <IconButton color="primary" onClick={openModal}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Filters;
