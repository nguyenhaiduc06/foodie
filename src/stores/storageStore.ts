import { supabase } from "@/lib";
import { Storage } from "@/lib";
import { create } from "zustand";
import { useGroupStore } from "./groupStore";
import axios from "axios";
import dayjs from "dayjs";
import { useNotificationStore } from "./notificationStore";
import { api } from "@/lib/api";
import { Alert } from "react-native";

interface StorageStoreState {
  storages: Storage[];
  fetching: boolean;
  initStorageStore: () => void;
  fetchStorages: () => void;
  createStorage: (data: any) => Promise<void>;
  updateStorage: (id: number, data: any) => Promise<void>;
  deleteStorage: (id: number) => Promise<void>;
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
    const { storages, error } = await api.getStorages(
      useGroupStore.getState().currentGroup?.id
    );
    set({ fetching: false });
    if (error) return Alert.alert(error.message);
    set({ storages });
  },
  createStorage: async ({ name, amount, storedIn, expireDate }) => {
    const { storage, error } = await api.createStorage({
      group_id: useGroupStore.getState().currentGroup?.id,
      name,
      amount,
      stored_in: storedIn,
      expire_date: expireDate,
      image_url: "",
    });
    if (error) return Alert.alert(error.message);
    const newStorages = [storage, ...get().storages];
    set({ storages: newStorages });
  },
  updateStorage: async (id, { name, amount, stored_in, expire_date }) => {
    const { storage: updatedStorage, error } = await api.updateStorage(id, {
      name,
      amount,
      stored_in,
      expire_date,
      image_url: "",
    });
    if (error) return Alert.alert(error.message);
    const newStorages = get().storages.map((storage) =>
      storage.id == updatedStorage.id ? updatedStorage : storage
    );
    set({ storages: newStorages });
  },
  deleteStorage: async (id) => {
    const { error } = await api.deleteStorage(id);
    if (error) return Alert.alert(error.message);
    const newStorages = get().storages.filter((storage) => storage.id != id);
    set({ storages: newStorages });
  },
}));
