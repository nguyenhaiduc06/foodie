import { Group, supabase } from "@/lib";
import { create } from "zustand";
import { useUserStore } from "./userStore";

interface GroupStoreState {
  groups: Group[];
  currentGroup: Group;
  initGroupStore: () => void;
  fetchGroups: () => Promise<{ error?: Error }>;
  activateGroup: (id: number) => void;
}

export const useGroupStore = create<GroupStoreState>()((set, get) => ({
  groups: [],
  currentGroup: null,
  initGroupStore: () => {
    useUserStore.subscribe((s) => {
      if (s.user?.id) {
        get().fetchGroups();
      }
    });
  },
  fetchGroups: async () => {
    const { data: groups, error } = await supabase.from("groups").select("*");
    if (error) return { error: new Error(error.message) };
    set((s) => ({ groups, currentGroup: s.currentGroup ?? groups[0] }));
  },
  activateGroup: (id: number) => {
    const groupToActivate = get().groups.filter((g) => g.id == id)[0];
    set({ currentGroup: groupToActivate });
  },
}));
