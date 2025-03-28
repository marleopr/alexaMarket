import { ShippingType } from "../../../../services/shipping/get-shipping";

export const validate = (values: ShippingType) => {
  const errors = {
    MKTP_COD: false,
    storeConfig_Id: false,
    name: false,
    start_track: false,
    end_track: false,
    value: false,
    start_term: false,
    end_term: false,
  };

  if (values.MKTP_COD === null) {
    errors.MKTP_COD = true;
  }

  if (values.storeConfig_Id === null) {
    errors.storeConfig_Id = true;
  }

  if (!values.name) {
    errors.name = true;
  }

  if (values.start_track === null) {
    errors.start_track = true;
  }

  if (values.end_track === null) {
    errors.end_track = true;
  }

  if (values.value === null) {
    errors.value = true;
  }

  if (!values.start_term) {
    errors.start_term = true;
  }

  if (!values.end_term) {
    errors.end_term = true;
  }

  return errors;
};
