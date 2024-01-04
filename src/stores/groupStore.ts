import { Account, Group, Member, supabase } from "@/lib";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { ImageResult } from "expo-image-manipulator";
import { api } from "@/lib/api";
import dayjs from "dayjs";

type ActionResult = Promise<{ error?: string }>;

interface GroupStoreState {
  groups: Group[];
  currentGroup: Group;
  fetching: boolean;
  initGroupStore: () => Promise<void>;
  fetchGroups: () => ActionResult;
  createGroup: (data: {
    name: string;
    image?: ImageResult;
    memberAccounts: Account[];
  }) => ActionResult;
  updateGroup: (
    group_id: number,
    data: {
      name: string;
      image?: ImageResult;
    }
  ) => ActionResult;
  deleteGroup: (group_id: number) => ActionResult;
  activateGroup: (group_id: number) => void;
  addMemberToGroup: (account_id: number, group_id: number) => ActionResult;
  removeMemberFromGroup: (account_id: number, group_id: number) => ActionResult;
}

export const useGroupStore = create<GroupStoreState>()((set, get) => ({
  groups: [],
  currentGroup: null,
  fetching: false,
  initGroupStore: async () => {
    await get().fetchGroups();

    useAuthStore.subscribe((s) => {
      get().fetchGroups();
    });
  },
  fetchGroups: async () => {
    set({ fetching: true });

    const account_id = useAuthStore.getState().account?.id;

    const { data, error: fetchAccountGroupError } = await supabase
      .from("members")
      .select("group:groups(*)")
      .eq("account_id", account_id);
    if (fetchAccountGroupError)
      return { error: fetchAccountGroupError.message };

    const groups = data.map((e) => ({
      ...e.group,
    }));

    if (groups.length == 0) {
      get().createGroup({ name: "Nhóm", memberAccounts: [] });
    } else {
      set((s) => ({ groups, currentGroup: s.currentGroup ?? groups[0] }));
    }

    set({ fetching: false });
  },
  createGroup: async ({ name, image, memberAccounts }) => {
    const account_id = useAuthStore.getState().account.id;
    const filePath = `${account_id}/images/group-avatars/${dayjs().toISOString()}.png`;
    const image_url = await uploadAndGetImageURL(filePath, image);

    const { data: group, error: createGroupError } = await supabase
      .from("groups")
      .insert({ name, image_url })
      .select()
      .single();
    if (createGroupError) return { error: createGroupError.message };

    const rows = memberAccounts.map((m) => ({
      account_id: m.id,
      group_id: group.id,
      is_admin: false,
      status: "invited",
    }));

    const { error: createMemberError } = await supabase.from("members").insert([
      {
        account_id,
        group_id: group.id,
        is_admin: true,
        status: "active",
      },
      ...rows,
    ]);
    if (createMemberError) return { error: createMemberError.message };

    // for each phone number in memberPhones, file and create an invitation for that memeber to join the created group

    set((s) => ({
      groups: [...s.groups, group],
      currentGroup: s.currentGroup ?? group,
    }));
  },
  updateGroup: async (group_id, { name, image }) => {
    const account_id = useAuthStore.getState().account.id;
    const filePath = `${account_id}/images/group-avatars/${dayjs().toISOString()}.png`;
    const image_url = await uploadAndGetImageURL(filePath, image);

    const { error: updateGroupError } = await supabase
      .from("groups")
      .update({ name, image_url })
      .eq("id", group_id);
    if (updateGroupError) return { error: updateGroupError.message };

    // set state
  },
  deleteGroup: async (group_id: number) => {
    // check if can delete
    // delete from api
    // update state
    // set new group
    const { error: deleteGroupError } = await supabase
      .from("groups")
      .delete()
      .eq("id", group_id);
    if (deleteGroupError) return { error: deleteGroupError.message };
    const { error: deleteGroupMemberError } = await supabase
      .from("members")
      .delete()
      .eq("group_id", group_id);
    if (deleteGroupMemberError)
      return { error: deleteGroupMemberError.message };
  },
  activateGroup: (group_id: number) => {
    const groupToActivate = get().groups.filter((g) => g.id == group_id)[0];
    set({ currentGroup: groupToActivate });
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
}));

const uploadAndGetImageURL = async (filePath, image) => {
  if (!image) return "";
  const { publicUrl, error } = await api.uploadImage({
    filePath,
    base64Image: image.base64,
  });
  if (error) return "";
  return publicUrl;
};
