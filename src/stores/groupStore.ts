import { Account, Group, Member, supabase } from "@/lib";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { ImageResult } from "expo-image-manipulator";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import { Alert } from "react-native";

type ActionResult = Promise<{ error?: string }>;

interface GroupStoreState {
  groups: Group[];
  currentGroup: Group;
  fetching: boolean;
  groupReport: unknown;
  initGroupStore: () => Promise<void>;
  fetchGroups: () => Promise<void>;
  createGroup: (data: {
    name: string;
    image?: ImageResult;
    member_ids: string[];
  }) => Promise<void>;
  updateGroup: (
    group_id: number,
    data: {
      name: string;
      image?: ImageResult;
    }
  ) => Promise<void>;
  deleteGroup: (group_id: number) => Promise<void>;
  activateGroup: (group_id: number) => void;
  addMemberToGroup: (account_id: number, group_id: number) => ActionResult;
  removeMemberFromGroup: (account_id: number, group_id: number) => ActionResult;
  fetchGroupReport: () => Promise<void>;
}

export const useGroupStore = create<GroupStoreState>()((set, get) => ({
  groups: [],
  currentGroup: null,
  fetching: false,
  groupReport: {},
  initGroupStore: async () => {
    await get().fetchGroups();

    useAuthStore.subscribe((s) => {
      if (s.account?.id) {
        get().fetchGroups();
      }
    });
  },
  fetchGroups: async () => {
    set({ fetching: true });
    const { groups, error } = await api.getGroups(
      useAuthStore.getState().account.id
    );
    set({ fetching: false });
    if (error) return Alert.alert(error.message);
    const currentGroup = groups[0];
    set({ groups, currentGroup });

    get().fetchGroupReport();
  },
  createGroup: async ({ name, image, member_ids }) => {
    const image_url = image ? await api.uploadGroupAvatar(image.base64) : null;
    const { group, error } = await api.createGroup({
      name,
      image_url,
      manager_id: useAuthStore.getState().account.id,
      member_ids,
    });
    if (error) return Alert.alert(error.message);
    set((s) => ({ groups: [group, ...s.groups] }));
  },
  updateGroup: async (group_id, { name, image }) => {
    const image_url = image?.base64
      ? await api.uploadGroupAvatar(image.base64)
      : image.uri;
    const { group: updatedGroup, error } = await api.updateGroup(group_id, {
      name,
      image_url,
    });
    const newGroups = get().groups.map((group) =>
      group.id == updatedGroup.id ? updatedGroup : group
    );
    const newCurrentGroup =
      get().currentGroup.id == updatedGroup.id
        ? updatedGroup
        : get().currentGroup;
    set({ groups: newGroups, currentGroup: newCurrentGroup });
  },
  deleteGroup: async (group_id: number) => {
    if (get().groups.length == 1) {
      return Alert.alert("Bạn không thể xóa nhóm này");
    }
    const { error } = await api.deleteGroup(group_id);
    if (error) return Alert.alert(error.message);
    const newGroups = get().groups.filter((group) => group.id != group_id);
    const newCurrentGroup =
      get().currentGroup.id == group_id ? newGroups[0] : get().currentGroup;
    set({ groups: newGroups, currentGroup: newCurrentGroup });
  },
  activateGroup: async (group_id: number) => {
    const groupToActivate = get().groups.filter((g) => g.id == group_id)[0];
    set({ currentGroup: groupToActivate });

    get().fetchGroupReport();
  },
  addMemberToGroup: async (account_id, group_id) => {
    const { error } = await supabase.from("members").insert({
      account_id,
      group_id,
    });
    if (error) return { error: error.message };
  },
  removeMemberFromGroup: async (account_id, group_id) => {
    const { error } = await supabase
      .from("members")
      .delete()
      .eq("account_id", account_id)
      .eq("group_id", group_id);
    if (error) return { error: error.message };
  },
  fetchGroupReport: async () => {
    const currentGroup = get().currentGroup;
    // create groupReport
    const { data: storages } = await supabase
      .from("storages")
      .select("*")
      .eq("group_id", currentGroup.id);

    const { data: recipes } = await supabase
      .from("recipes")
      .select("*")
      .eq("group_id", currentGroup.id);
    const { data: todos } = await supabase
      .from("todos")
      .select("*")
      .eq("group_id", currentGroup?.id);

    const chartData = [0, 0, 0, 0, 0, 0, 0];
    for (const todo of todos) {
      const { date } = todo;
      const dayOfWeek = dayjs(date).day();
      chartData[dayOfWeek] = chartData[dayOfWeek] + 1;
    }
    set({
      groupReport: {
        storageCount: storages.length,
        recipeCount: recipes.length,
        chartData,
      },
    });
  },
}));
