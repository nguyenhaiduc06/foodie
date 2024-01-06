import { create } from "zustand";
import type { Notification } from "@/lib";
import { registerForPushNotificationsAsync } from "@/services/notification";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useGroupStore } from "./groupStore";
import { api } from "@/lib/api";

interface NotificationStoreState {
  notifications: Notification[];
  pushToken: "";
  initNotificationStore: () => void;
  fetching: boolean;
  fetchNotifications: () => void;
}

export const useNotificationStore = create<NotificationStoreState>()(
  (set, get) => ({
    notifications: [],
    pushToken: "",
    fetching: false,
    initNotificationStore: () => {
      // fetch notifications
      // subscribe to changes
      registerForPushNotificationsAsync().then((token) => {
        set({ pushToken: token });
      });

      useGroupStore.subscribe((s) => {
        if (s.currentGroup?.id) {
          get().fetchNotifications();
        }
      });
    },
    fetchNotifications: async () => {
      set({ fetching: true });
      const { data, error } = await api.getNotifications(
        useGroupStore.getState().currentGroup.id
      );
      set({ fetching: false });
      set({ notifications: data });
    },
  })
);
