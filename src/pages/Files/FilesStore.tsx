import { create } from "zustand";
import {
  FileType,
  getFilesService,
} from "../../services/files/get-files-service";
import {
  UploadFilePayload,
  uploadFileService,
} from "../../services/files/upload-file-service";
import { getFilesTypeService } from "../../services/files/get-files-type";

type Store = {
  fileList: FileType[];
  getFiles: (
    mktp_cod: number | string,
    name: string,
    date_start: string,
    date_end: string,
    type: string,
    error: string,
    offset: number | string,
    limit: number | string
  ) => Promise<void>;
  storeListLoading: boolean;

  page: number;
  setPage: (page: number) => Promise<void>;

  resetFilesState: () => void;

  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => Promise<void>;
  count: number;

  filters: {
    mktp_cod: number | string;
    name: string;
    type: string;
    date_start: string;
    date_end: string;
    error: string;
  };

  setFilters: (filters: {
    mktp_cod: number | string;
    name: string;
    type: string;
    date_start: string;
    date_end: string;
    error: string;
  }) => void;

  createFile: (store: UploadFilePayload) => Promise<number>;
  createFileLoading: boolean;

  getFilesType: () => Promise<void>;
  fileTypeList: {
    type: string;
  }[];
};

export const filesStore = create<Store>()((set, get) => ({
  storeListLoading: true,
  fileList: [],

  getFiles: async (
    mktp_cod,
    name,
    date_start,
    date_end,
    type,
    error,
    offset,
    limit
  ) => {
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
    if (name) {
      params.push({
        name: "name",
        value: name,
        condition: "=",
      });
    }

    if (error) {
      params.push({
        name: "error",
        value: error,
        condition: "=",
      });
    }
    if (date_start) {
      params.push({
        name: "created_at",
        value: date_start,
        condition: date_end ? ">=" : "=",
      });
    }

    if (date_end) {
      params.push({
        name: "created_at",
        value: date_end,
        condition: date_start ? "<=" : "=",
      });
    }

    if (type) {
      params.push({
        name: "type",
        value: type,
        condition: "=",
      });
    }

    set({ storeListLoading: true });
    const response = await getFilesService({
      Params: params as any,
    });

    if (response.code === "error") {
      set({ storeListLoading: false });
      console.error("Error fetching mktp_cod");
      return;
    }

    set({
      fileList: response.data.data.records,
      storeListLoading: false,
      count: response.data.data.count,
    });
  },

  count: 0,

  page: 0,
  setPage: async (page) => {
    set({ page });
    get().getFiles(
      get().filters.mktp_cod,
      get().filters.name,
      get().filters.date_start,
      get().filters.date_end,
      get().filters.type,
      get().filters.error,
      page * get().rowsPerPage,
      get().rowsPerPage
    );
  },

  rowsPerPage: 10,
  setRowsPerPage: async (rowsPerPage) => {
    set({ rowsPerPage, page: 0 });
    get().getFiles(
      get().filters.mktp_cod,
      get().filters.name,
      get().filters.date_start,
      get().filters.date_end,
      get().filters.type,
      get().filters.error,
      0,
      rowsPerPage
    );
  },

  filters: {
    mktp_cod: "",
    name: "",
    type: "",
    date_start: "",
    date_end: "",
    error: "",
  },
  setFilters: (filters) => {
    set({ filters });
  },

  resetFilesState: () => {
    set({
      fileList: [],
      storeListLoading: true,
      page: 0,
      rowsPerPage: 10,
      filters: {
        mktp_cod: "",
        name: "",
        type: "",
        date_start: "",
        date_end: "",
        error: "",
      },
      count: 0,
    });
  },

  createFileLoading: false,
  createFile: async ({ formData, MKTP_COD: mktp_cod }) => {
    set({ createFileLoading: true });
    const res = await uploadFileService({ formData, MKTP_COD: mktp_cod });
    set({ createFileLoading: false });
    return res.status;
  },

  fileTypeList: [],
  getFilesType: async () => {
    const response = await getFilesTypeService();
    if (response.code === "success") {
      set({ fileTypeList: response.data.data.records });
    }
  },
}));
