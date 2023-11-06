import { supabase } from "@/lib";
import { Storage } from "@/lib";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

interface StorageStoreState {
  storages: Storage[];
  fetching: boolean;
  initStorageStore: () => void;
  fetchStorages: () => void;
  createStorage: () => void;
}

export const useStorageStore = create<StorageStoreState>()((set, get) => ({
  storages: [],
  fetching: false,
  initStorageStore: async () => {
    get().fetchStorages();

    useAuthStore.subscribe((s) => {
      if (s.user?.id) {
        get().fetchStorages();
      }
    });
  },
  fetchStorages: async () => {
    set({ fetching: true });

    const user_id = useAuthStore.getState().user?.id;
    if (!user_id) return;

    const { data: storages, error } = await supabase
      .from("storages")
      .select("*")
      .eq("user_id", user_id);

    set({ fetching: false });

    if (!error) {
      set({ storages });
    }
  },
  createStorage: () => {},
}));
