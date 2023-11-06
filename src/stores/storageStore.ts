import { supabase } from "@/lib";
import { Storage } from "@/lib";
import { create } from "zustand";
import { useGroupStore } from "./groupStore";

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

    useGroupStore.subscribe((s) => {
      if (s.currentGroup?.id) {
        get().fetchStorages();
      }
    });
  },
  fetchStorages: async () => {
    set({ fetching: true });

    const group_id = useGroupStore.getState().currentGroup?.id;
    if (!group_id) return;

    const { data: storages, error } = await supabase
      .from("storages")
      .select("*")
      .eq("group_id", group_id);

    set({ fetching: false });

    if (!error) {
      set({ storages });
    }
  },
  createStorage: () => {},
}));
