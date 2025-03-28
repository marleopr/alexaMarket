// import { create } from "zustand";
// import { getStoresService, StoreType } from "../../services/store/get-stores";
// import {
//   CreateStorePayload,
//   createStoreService,
// } from "../../services/store/create-store";
// import {
//   EditStorePayload,
//   editStoreService,
// } from "../../services/store/edit-store";

// type Store = {
//   storeList: StoreType[];
//   getStores: (
//     marketplace: number | string,
//     searchValue: string,
//     offset: number | string,
//     limit: number | string
//   ) => Promise<void>;
//   storeListLoading: boolean;

//   page: number;
//   setPage: (page: number) => Promise<void>;

//   resetStoreState: () => void;

//   rowsPerPage: number;
//   setRowsPerPage: (rowsPerPage: number) => Promise<void>;
//   count: number;

//   filters: {
//     marketplace: number | string;
//     searchValue: string;
//   };

//   setFilters: (filters: {
//     marketplace: number | string;
//     searchValue: string;
//   }) => void;

//   createStore: (store: CreateStorePayload) => Promise<string>;
//   createStoreLoading: boolean;

//   editStore: (store: EditStorePayload) => Promise<string>;
//   editStoreLoading: boolean;
// };

// export const storesStore = create<Store>()((set, get) => ({
//   storeListLoading: true,
//   storeList: [],

//   getStores: async (marketplace, searchValue, offset, limit) => {
//     const params = [
//       {
//         name: "Offset",
//         value: offset,
//         condition: "=",
//       },
//       {
//         name: "Limit",
//         value: limit,
//         condition: "=",
//       },
//     ];

//     if (marketplace !== "") {
//       params.push({
//         name: "MKTP_COD_MKT",
//         value: marketplace as string,
//         condition: "=",
//       });
//     }
//     if (searchValue) {
//       params.push({
//         name: "MKTP_NOM_NAM",
//         value: searchValue,
//         condition: "=",
//       });
//     }

//     set({ storeListLoading: true });
//     const response = await getStoresService({
//       Params: params as any,
//     });

//     if (response.code === "error") {
//       set({ storeListLoading: false });
//       console.error("Error fetching marketplaces");
//       return;
//     }
//     console.log(" response.data.data.records -> ", response.data.data.records);
//     set({
//       storeList: response.data.data.records,
//       storeListLoading: false,
//       count: response.data.data.count,
//     });
//   },

//   count: 0,

//   page: 0,
//   setPage: async (page) => {
//     set({ page });
//     get().getStores(
//       get().filters.marketplace,
//       get().filters.searchValue,
//       page * get().rowsPerPage,
//       get().rowsPerPage
//     );
//   },

//   rowsPerPage: 10,
//   setRowsPerPage: async (rowsPerPage) => {
//     set({ rowsPerPage, page: 0 });
//     get().getStores(
//       get().filters.marketplace,
//       get().filters.searchValue,
//       0,
//       rowsPerPage
//     );
//   },

//   filters: {
//     marketplace: "",
//     searchValue: "",
//   },
//   setFilters: (filters) => {
//     set({ filters });
//   },

//   resetStoreState: () => {
//     set({
//       storeList: [],
//       storeListLoading: true,
//       page: 0,
//       rowsPerPage: 10,
//       filters: {
//         marketplace: "",
//         searchValue: "",
//       },
//       count: 0,
//     });
//   },

//   createStoreLoading: false,
//   createStore: async (store) => {
//     set({ createStoreLoading: true });
//     const res = await createStoreService(store);
//     set({ createStoreLoading: false });
//     if (res.code === "error") {
//       return res.error as unknown as string;
//     }
//     return "";
//   },

//   editStoreLoading: false,
//   editStore: async (store) => {
//     set({ editStoreLoading: true });
//     const res = await editStoreService(store);
//     set({ editStoreLoading: false });
//     if (res.code === "error") {
//       return res.error as unknown as string;
//     }
//     return "";
//   },
// }));
