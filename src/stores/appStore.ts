import { create } from "zustand";
import { useUserStore } from "./userStore";

interface AppStoreState {
  initializing: boolean;
  initStores: () => void;
}

export const useAppStore = create<AppStoreState>()((set) => ({
  initializing: true,
  initStores: async () => {
    console.log("before init");
    await useUserStore.getState().initUserStore();
    console.log("after init");
    set({ initializing: false });
  },
}));
