import { supabase } from "@/lib";
import { Storage } from "@/lib";
import { create } from "zustand";
import { useGroupStore } from "./groupStore";

interface StorageStoreState {
  storages: Storage[];
  fetching: boolean;
  initStorageStore: () => void;
  fetchStorages: () => void;
  createStorage: (data: {
    name: string;
    amount: string;
    storedIn: string;
    expireDate: Date;
  }) => Promise<{ error: Error | null }>;
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
  createStorage: async ({ name, amount, storedIn, expireDate }) => {
    const group_id = useGroupStore.getState().currentGroup?.id;
    const { data: newStorage, error: storageCreateError } = await supabase
      .from("storages")
      .insert({
        name,
        amount,
        stored_in: storedIn,
        expire_date: expireDate.toISOString(),
        group_id,
      })
      .select()
      .single();
    if (storageCreateError)
      return { error: new Error(storageCreateError.message) };

    set((s) => ({ storages: [newStorage, ...s.storages] }));
    return { error: null };
  },
}));
