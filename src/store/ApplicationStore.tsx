import { create } from "zustand";
import { LoggedUser } from "../types/logged-user";
import {
  getMarketplacesService,
  MarketPlacesType,
} from "../services/marketplaces/get-market-places";

type Store = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  menuIsOpen: string;

  toggleMenu: () => void;

  applicationLoading: boolean;
  setApplicationLoading: (applicationLoading: boolean) => void;

  loggedUser: LoggedUser;
  setLoggedUser: (loggedUser: LoggedUser) => void;

  //Marketplaces List
  marketplaceList: MarketPlacesType[];
  getMarketplaces: () => void;
  marketplaceListLoading: boolean;
};

export const appStore = create<Store>()((set, get) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  menuIsOpen: "true",
  toggleMenu: () => {
    set({ menuIsOpen: get().menuIsOpen === "true" ? "false" : "true" });
  },

  applicationLoading: true,
  setApplicationLoading: (applicationLoading: boolean) =>
    set({ applicationLoading }),

  loggedUser: {
    data: "",
    globalAccountKey: "",
    productKey: "",
    account: "",
    userAccountID: "",
    Email: "",
    active: false,
    name: "",
    phone: "",
    celPhone: "",
    mainUser: false,
    roles: [],
  },

  setLoggedUser: (loggedUser: LoggedUser) => {
    set({ loggedUser });
  },

  marketplaceListLoading: true,
  marketplaceList: [],
  getMarketplaces: async () => {
    set({ marketplaceListLoading: true });
    const response = await getMarketplacesService();

    if (response.code === "error") {
      set({ marketplaceListLoading: false });
      console.error("Error fetching marketplaces");
      return;
    }
    console.log("marketplaces opts -> ", response.data.data);
    set({
      marketplaceList: response.data.data.records,
      marketplaceListLoading: false,
    });
  },
}));
