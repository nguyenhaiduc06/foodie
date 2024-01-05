import { create } from "zustand";
import type { Notification } from "@/lib";
import { registerForPushNotificationsAsync } from "@/services/notification";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

interface NotificationStoreState {
  notifications: Notification[];
  pushToken: "";
  initNotificationStore: () => void;
  fetchNotifications: () => void;
}

export const useNotificationStore = create<NotificationStoreState>()(
  (set, get) => ({
    notifications: [],
    pushToken: "",
    initNotificationStore: () => {
      // fetch notifications
      // subscribe to changes
      registerForPushNotificationsAsync().then((token) => {
        set({ pushToken: token });
      });
    },
    fetchNotifications: () => {},
  })
);
