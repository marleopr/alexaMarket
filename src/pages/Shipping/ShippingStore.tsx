import { create } from "zustand";
import {
  getShippingService,
  ShippingType,
} from "../../services/shipping/get-shipping";
import {
  getStoreConfigService,
  StoreConfigType,
} from "../../services/store/get-store-config";
import removeTime from "../../utils/remove-time";

export type ShippingFilters = {
  MKTP_COD: number | string;
  MKTP_COD_MKT: string;
};

type Store = {
  shippingList: ShippingType[];
  getShipping: () => Promise<void>;
  shippingListLoading: boolean;

  page: number;
  setPage: (page: number) => Promise<void>;

  resetStoreState: () => void;

  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => Promise<void>;
  count: number;

  filters: {
    MKTP_COD: number | string;
    MKTP_COD_MKT: string;
  };

  setFilters: (filters: ShippingFilters) => void;

  getStoreConfigFromAnStore: (id: number) => void;
  storeConfigFromAnStoreList: StoreConfigType[];
  storeConfigFromAnListLoading: boolean;

  clearStoreConfigFromAnStore: () => void;

  changeAnyStoreValues: (values: Partial<Store>) => void;
};

export const shippingStore = create<Store>()((set, get) => ({
  shippingListLoading: true,
  shippingList: [],

  getShipping: async () => {
    const filters = get().filters;
    const rowsPerPage = get().rowsPerPage;
    const page = get().page;

    const params = [
      {
        name: "Offset",
        value: page * rowsPerPage,
        condition: "=",
      },
      {
        name: "Limit",
        value: rowsPerPage,
        condition: "=",
      },
    ];
    if (filters.MKTP_COD) {
      params.push({
        name: "MKTP_COD",
        value: filters.MKTP_COD as unknown as number,
        condition: "=",
      });
    }
    if (filters.MKTP_COD_MKT) {
      params.push({
        name: "MKTP_COD_MKT",
        value: filters.MKTP_COD_MKT as unknown as number,
        condition: "=",
      });
    }

    set({ shippingListLoading: true });
    const response = await getShippingService({
      Params: params as any,
    });

    if (response.code === "error") {
      set({ shippingListLoading: false });
      console.error("Error fetching marketplaces");
      return;
    }
    set({
      shippingList: response.data.data.records.map((record) => ({
        ...record,
        end_term: removeTime(record.end_term),
        start_term: removeTime(record.start_term),
      })),
      shippingListLoading: false,
      count: response.data.data.count,
    });
  },

  count: 0,

  page: 0,
  setPage: async (page) => {
    set({ page });
  },

  rowsPerPage: 10,
  setRowsPerPage: async (rowsPerPage) => {
    set({ rowsPerPage, page: 0 });
  },

  filters: {
    MKTP_COD: "",
    MKTP_COD_MKT: "",
    shipping_id: "",
  },
  setFilters: (filters) => {
    set({ filters });
  },

  resetStoreState: () => {
    set({
      shippingList: [],
      shippingListLoading: true,
      page: 0,
      rowsPerPage: 10,
      filters: {
        MKTP_COD: "",
        MKTP_COD_MKT: "",
      },
      count: 0,
    });
  },

  storeConfigFromAnStoreList: [],
  storeConfigFromAnListLoading: true,
  getStoreConfigFromAnStore: async (id) => {
    set({ storeConfigFromAnListLoading: true });
    const response = await getStoreConfigService({ id });

    if (response.code === "error") {
      set({ storeConfigFromAnListLoading: false });
      console.error("Error fetching store config");
      return;
    }
    set({
      storeConfigFromAnStoreList: response.data.data.records,
      storeConfigFromAnListLoading: false,
    });
  },
  clearStoreConfigFromAnStore: () => {
    set({ storeConfigFromAnStoreList: [] });
  },

  changeAnyStoreValues: (values) => {
    set({ ...values });
  },
}));