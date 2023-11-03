import { supabase } from "@/lib";
import { Storage } from "@/lib";
import { create } from "zustand";
import { useUserStore } from "./userStore";

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
    useUserStore.subscribe((s) => {
      if (s.user?.id) {
        get().fetchStorages();
      }
    });
  },
  fetchStorages: async () => {
    set({ fetching: true });

    const user_id = useUserStore.getState().user?.id;
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
