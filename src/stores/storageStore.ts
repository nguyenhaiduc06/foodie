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
  createStorage: (data: any) => void;
  updateStorage: (id: number, data: any) => void;
  deleteStorage: (id: number) => void;
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

    // schedule
    // const dateToSendNotification = dayjs().add(2, "seconds").toDate();
    // const push_token = useNotificationStore.getState().pushToken;
    // axios
    //   .post("http://192.168.31.60:3000/notifications", {
    //     id: newStorage.id.toString(),
    //     push_token: push_token,
    //     title: "Thực phẩm sắp hết hạn",
    //     body: "Còn 3 ngày nữa là món gà trong tủ lạnh sẽ hết hạn",
    //     date: dateToSendNotification,
    //   })
    //   .then((res) => console.log(res.data))
    //   .catch((e) => console.log(e.message));

    // set((s) => ({ storages: [newStorage, ...s.storages] }));
    // return { error: null };
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
