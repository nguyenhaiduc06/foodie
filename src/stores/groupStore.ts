import { Group, supabase } from "@/lib";
import { create } from "zustand";
import { useAuthStore } from "./authStore";

interface GroupStoreState {
  groups: Group[];
  currentGroup: Group;
  initGroupStore: () => Promise<void>;
  fetchGroups: () => Promise<{ error: Error | null }>;
  createGroup: (data: { name: string }) => Promise<{ error: Error | null }>;
  activateGroup: (id: number) => void;
}

export const useGroupStore = create<GroupStoreState>()((set, get) => ({
  groups: [],
  currentGroup: null,
  initGroupStore: async () => {
    await get().fetchGroups();

    useAuthStore.subscribe((s) => {
      get().fetchGroups();
    });
  },
  fetchGroups: async () => {
    const account_id = useAuthStore.getState().account?.id;
    console.log({ account_id });
    if (!account_id) return { error: new Error("No user logged in") };

    const { data: groups, error: fetchGroupError } = await supabase
      .from("groups")
      .select("*, accounts(count)")
      .eq("accounts.id", account_id);
    console.log({ groups });
    if (fetchGroupError) return { error: new Error(fetchGroupError.message) };

    if (groups.length == 0) {
      get().createGroup({ name: "Nhóm" });
    } else {
      set((s) => ({ groups, currentGroup: s.currentGroup ?? groups[0] }));
    }
    return { error: null };
  },
  createGroup: async ({ name }) => {
    const account_id = useAuthStore.getState().account?.id;
    if (!account_id) return { error: new Error("No user logged in") };

    const { data: group, error: createGroupError } = await supabase
      .from("groups")
      .insert({ name })
      .select()
      .single();
    if (createGroupError) return { error: new Error(createGroupError.message) };

    const { error: createAccountGroupError } = await supabase
      .from("accounts_groups")
      .insert({
        account_id,
        group_id: group.id,
        is_admin: true,
        status: "active",
      });
    if (createAccountGroupError)
      return { error: new Error(createAccountGroupError.message) };

    set((s) => ({
      groups: [...s.groups, group],
      currentGroup: s.currentGroup ?? group,
    }));
    return { error: null };
  },
  activateGroup: (id: number) => {
    const groupToActivate = get().groups.filter((g) => g.id == id)[0];
    set({ currentGroup: groupToActivate });
  },
}));
