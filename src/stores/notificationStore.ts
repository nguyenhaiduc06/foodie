import { create } from "zustand";
import type { Notification } from "@/lib";

interface NotificationStoreState {
  notifications: Notification[];
  initNotificationStore: () => void;
  fetchNotifications: () => void;
}

export const useNotificationStore = create<NotificationStoreState>()(
  (set, get) => ({
    notifications: [],
    initNotificationStore: () => {
      // fetch notifications
      // subscribe to changes
    },
    fetchNotifications: () => {},
  })
);
