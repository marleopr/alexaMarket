// import { create } from "zustand";
// import { getStoresService, StoreType } from "../../services/store/get-stores";
// import { CreateStorePayload, createStoreService } from "../../services/store/create-store";

// type Store = {
//   storeList: StoreType[];
//   getStores: (
//     marketplace: number | string,
//     searchValue: string,
//     offset: number | string,
//     limit: number | string
//   ) => void;
//   storeListLoading: boolean;

//   page: number;
//   setPage: (page: number) => void;

//   resetStoreState: () => void;

//   rowsPerPage: number;
//   setRowsPerPage: (rowsPerPage: number) => void;

//   filters: {
//     marketplace: number | string;
//     searchValue: string;
//   };

//   setFilters: (filters: {
//     marketplace: number | string;
//     searchValue: string;
//   }) => void;

//   createStore: (store: CreateStorePayload) => void;
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
//     console.log("stores -> ", response.data.data);
//     set({ storeList: response.data.data, storeListLoading: false });
//   },

//   page: 0,
//   setPage: (page) => {
//     set({ page });
//     get().getStores(
//       get().filters.marketplace,
//       get().filters.searchValue,
//       page,
//       get().rowsPerPage
//     );
//   },

//   rowsPerPage: 10,
//   setRowsPerPage: (rowsPerPage) => {
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
//     });
//   },

//   createStore: async (store) => {
//     console.log("store -> ", store);
//     await createStoreService(store);
//   },
// }));
