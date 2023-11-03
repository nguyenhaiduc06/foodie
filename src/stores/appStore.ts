import { create } from "zustand";
import { useUserStore } from "./userStore";
import { useRecipeStore } from "./recipeStore";
import { useStorageStore } from "./storageStore";

interface AppStoreState {
  initializing: boolean;
  initStores: () => void;
}

export const useAppStore = create<AppStoreState>()((set) => ({
  initializing: true,
  initStores: async () => {
    await useUserStore.getState().initUserStore();
    set({ initializing: false });
    useRecipeStore.getState().initRecipeStore();
    useStorageStore.getState().initStorageStore();
  },
}));
