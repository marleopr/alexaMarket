import { create } from "zustand";
import { LoggedUser } from "../types/logged-user";

type Store = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  menuIsOpen: string;
  toggleMenu: () => void;
  applicationLoading: boolean;
  setApplicationLoading: (applicationLoading: boolean) => void;
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
  loggedUser: LoggedUser;
  setLoggedUser: (loggedUser: LoggedUser) => void;
};

export const appStore = create<Store>()((set, get) => ({
  isAuthenticated: true,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  menuIsOpen: "true",
  toggleMenu: () => {
    set({ menuIsOpen: get().menuIsOpen === "true" ? "false" : "true" });
  },

  applicationLoading: true,
  setApplicationLoading: (applicationLoading: boolean) =>
    set({ applicationLoading }),

  isAdmin: false,
  setAdmin: (isAdmin: boolean) => set({ isAdmin }),

  loggedUser: {
    id: "",
    username: "",
    name: "",
    email: "",
    roles: [],
    groupsIds: [],
  },
  setLoggedUser: (loggedUser: LoggedUser) => {
    set({ loggedUser });
    set({ isAdmin: loggedUser.roles.includes("ADMIN") });
  },
}));
