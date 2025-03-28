import { create } from "zustand";
import { getFilesTypeService } from "../../services/files/get-files-type";
import {
  getOrdersService,
  OrderType,
} from "../../services/orders/get-orders-service";

type Store = {
  orderList: OrderType[];
  getOrders: (
    mktp_cod: number | string,
    date_start: string,
    date_end: string,
    type: string,
    offset: number | string,
    limit: number | string
  ) => Promise<void>;
  storeListLoading: boolean;

  page: number;
  setPage: (page: number) => Promise<void>;

  resetOrdersState: () => void;

  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => Promise<void>;
  count: number;

  filters: {
    mktp_cod: number | string;
    PEDS_STR_STAPAG: string;
    date_start: string;
    date_end: string;
  };

  setFilters: (filters: {
    mktp_cod: number | string;
    PEDS_STR_STAPAG: string;
    date_start: string;
    date_end: string;
  }) => void;

  getFilesType: () => Promise<void>;
  fileTypeList: {
    type: string;
  }[];
};

export const ordersStore = create<Store>()((set, get) => ({
  storeListLoading: true,
  orderList: [],

  getOrders: async (mktp_cod, date_start, date_end, PEDS_STR_STAPAG, offset, limit) => {
    const params = [
      {
        name: "Offset",
        value: offset,
        condition: "=",
      },
      {
        name: "Limit",
        value: limit,
        condition: "=",
      },
    ];

    if (mktp_cod !== "") {
      params.push({
        name: "mktp_cod",
        value: mktp_cod as string,
        condition: "=",
      });
    }

    if (date_start) {
      params.push({
        name: "PEDS_DAT_DATPDS",
        value: date_start,
        condition: date_end ? ">=" : "=",
      });
    }

    if (date_end) {
      params.push({
        name: "PEDS_DAT_DATPDS",
        value: date_end,
        condition: date_start ? "<=" : "=",
      });
    }

    if (PEDS_STR_STAPAG) {
      params.push({
        name: "PEDS_STR_STAPAG",
        value: PEDS_STR_STAPAG,
        condition: "=",
      });
    }

    set({ storeListLoading: true });
    const response = await getOrdersService({
      Params: params as any,
    });

    if (response.code === "error") {
      set({ storeListLoading: false });
      console.error("Error fetching mktp_cod");
      return;
    }

    set({
      orderList: response.data.data.records,
      storeListLoading: false,
      count: response.data.data.count,
    });
  },

  count: 0,

  page: 0,
  setPage: async (page) => {
    set({ page });
    get().getOrders(
      get().filters.mktp_cod,
      get().filters.date_start,
      get().filters.date_end,
      get().filters.PEDS_STR_STAPAG,
      page * get().rowsPerPage,
      get().rowsPerPage
    );
  },

  rowsPerPage: 10,
  setRowsPerPage: async (rowsPerPage) => {
    set({ rowsPerPage, page: 0 });
    get().getOrders(
      get().filters.mktp_cod,
      get().filters.date_start,
      get().filters.date_end,
      get().filters.PEDS_STR_STAPAG,
      0,
      rowsPerPage
    );
  },

  filters: {
    mktp_cod: "",
    PEDS_STR_STAPAG: "",
    date_start: "",
    date_end: "",
  },
  setFilters: (filters) => {
    set({ filters });
  },

  resetOrdersState: () => {
    set({
      orderList: [],
      storeListLoading: true,
      page: 0,
      rowsPerPage: 10,
      filters: {
        mktp_cod: "",
        PEDS_STR_STAPAG: "",
        date_start: "",
        date_end: "",
      },
      count: 0,
    });
  },

  fileTypeList: [],
  getFilesType: async () => {
    const response = await getFilesTypeService();
    if (response.code === "success") {
      set({ fileTypeList: response.data.data.records });
    }
  },
}));
