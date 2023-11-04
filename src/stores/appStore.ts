import { create } from "zustand";
import { useUserStore } from "./userStore";
import { useRecipeStore } from "./recipeStore";
import { useStorageStore } from "./storageStore";
import { useTodoStore } from "./todoStore";
import { useDishStore } from "./dishStore";

interface AppStoreState {
  initializing: boolean;
  initStores: () => void;
}

export const useAppStore = create<AppStoreState>()((set) => ({
  initializing: true,
  initStores: async () => {
    await useUserStore.getState().initUserStore();
    set({ initializing: false });
    useTodoStore.getState().initTodoStore();
    useDishStore.getState().initDishStore();
    useRecipeStore.getState().initRecipeStore();
    useStorageStore.getState().initStorageStore();
  },
}));
