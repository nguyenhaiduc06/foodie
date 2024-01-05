import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useRecipeStore } from "./recipeStore";
import { useStorageStore } from "./storageStore";
import { useTodoStore } from "./todoStore";
import { useDishStore } from "./dishStore";
import { useGroupStore } from "./groupStore";
import { useNotificationStore } from "./notificationStore";

interface AppStoreState {
  initializing: boolean;
  initStores: () => void;
}

export const useAppStore = create<AppStoreState>()((set) => ({
  initializing: true,
  initStores: async () => {
    await useAuthStore.getState().initAuthStore();
    useNotificationStore.getState().initNotificationStore();
    useGroupStore.getState().initGroupStore();
    set({ initializing: false });
    // useTodoStore.getState().initTodoStore();
    // useDishStore.getState().initDishStore();
    // useRecipeStore.getState().initRecipeStore();
    // useStorageStore.getState().initStorageStore();
  },
}));
