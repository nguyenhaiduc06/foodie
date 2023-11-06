import { Group, supabase } from "@/lib";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

interface GroupStoreState {
  groups: Group[];
  currentGroup: Group;
  initGroupStore: () => void;
  fetchGroups: () => Promise<{ error?: Error }>;
  createGroup: (data: { name: string }) => Promise<{ error?: Error }>;
  activateGroup: (id: number) => void;
}

export const useGroupStore = create<GroupStoreState>()((set, get) => ({
  groups: [],
  currentGroup: null,
  initGroupStore: () => {
    useAuthStore.subscribe((s) => {
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
  createGroup: async ({ name }) => {
    const user_id = useAuthStore.getState().user.id;
    const { data: group, error } = await supabase
      .from("groups")
      .insert({ name, user_id });
    if (error) return { error: new Error(error.message) };
  },
  activateGroup: (id: number) => {
    const groupToActivate = get().groups.filter((g) => g.id == id)[0];
    set({ currentGroup: groupToActivate });
  },
}));
