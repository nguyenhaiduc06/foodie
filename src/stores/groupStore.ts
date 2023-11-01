import { supabase } from "@/lib";
import { create } from "zustand";
import { useUserStore } from "./userStore";

export const useGroupStore = create((set) => ({
  groups: [],
  currentGroup: null,
  fetchGroups: async () => {
    const { data: groups, error } = await supabase.from("groups").select("*");
    set({ groups, currentGroup: groups[0] });
  },
  createGroup: async (name) => {
    const profile_id = useUserStore.getState().profile.id;
    const { data: newGroup, error } = await supabase
      .from("groups")
      .insert({ name, profile_id })
      .select();
    set((s) => ({ groups: [newGroup, ...s.group] }));
  },
}));
