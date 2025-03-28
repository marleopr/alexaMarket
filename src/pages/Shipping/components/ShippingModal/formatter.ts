import { ShippingType } from "../../../../services/shipping/get-shipping";
import { PutShippingPayload } from "../../../../services/shipping/put-shipping";

export const formatter = (
  newRegister: ShippingType,
  action: "A" | "I" | "E"
): PutShippingPayload => {

  const isEditing =
    newRegister.shipping_id !== null || newRegister.shipping_id !== undefined;

    if (isEditing) {
    return {
      pstart_term: newRegister.start_term,
      pend_term: newRegister.end_term,
      pstart_track: newRegister.start_track,
      pend_track: newRegister.end_track,
      pvalue: newRegister.value,
      pstoreConfig_ID: newRegister.storeConfig_Id,
      pid: newRegister.shipping_id,
      pname: newRegister.name,
      pACAO: action,
    };
  }

  return {
    pstart_term: newRegister.start_term,
    pend_term: newRegister.end_term,
    pstart_track: newRegister.start_track,
    pend_track: newRegister.end_track,
    pvalue: newRegister.value,
    pstoreConfig_ID: newRegister.storeConfig_Id,
    pid: newRegister.shipping_id,
    pname: newRegister.name,
    pACAO: action,
  };
};
