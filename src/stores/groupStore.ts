import { Account, Group, Member, supabase } from "@/lib";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { ImageResult } from "expo-image-manipulator";
import { api } from "@/lib/api";
import dayjs from "dayjs";

interface GroupStoreState {
  groups: Group[];
  currentGroup: Group;
  fetching: boolean;
  initGroupStore: () => Promise<void>;
  fetchGroups: () => Promise<{ error: Error | null }>;
  createGroup: (data: {
    name: string;
    image?: ImageResult;
    memberAccounts: Account[];
  }) => Promise<{ error: Error | null }>;
  updateGroup: (
    group: Group,
    data: {
      newName: string;
      newImage: ImageResult;
    }
  ) => Promise<{ error: Error | null }>;
  deleteGroup: (group: Group) => Promise<{ error: Error | null }>;
  activateGroup: (id: number) => void;
  addMember: (
    account: Account,
    group: Group
  ) => Promise<{ error: Error | null }>;
  removeMember: (memeber: Member) => Promise<{ error: Error | null }>;
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
      return { error: new Error(fetchAccountGroupError.message) };

    const groups = data.map((e) => ({
      ...e.group,
    }));

    if (groups.length == 0) {
      get().createGroup({ name: "Nhóm", memberAccounts: [] });
    } else {
      set((s) => ({ groups, currentGroup: s.currentGroup ?? groups[0] }));
    }

    set({ fetching: false });
    return { error: null };
  },
  createGroup: async ({ name, image, memberAccounts }) => {
    const account_id = useAuthStore.getState().account?.id;
    if (!account_id) return { error: new Error("No user logged in") };

    const filePath = `${account_id}/images/group-avatars/${dayjs().toISOString()}.png`;

    let image_url;
    if (!image) {
      image_url = "";
    } else {
      const { publicUrl, error: uploadImageError } = await api.uploadImage({
        filePath,
        base64Image: image.base64,
      });
      if (uploadImageError)
        return { error: new Error(uploadImageError.message) };
      image_url = publicUrl;
    }

    const { data: group, error: createGroupError } = await supabase
      .from("groups")
      .insert({ name, image_url })
      .select()
      .single();
    if (createGroupError) return { error: new Error(createGroupError.message) };

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
    if (createMemberError)
      return { error: new Error(createMemberError.message) };

    // for each phone number in memberPhones, file and create an invitation for that memeber to join the created group

    set((s) => ({
      groups: [...s.groups, group],
      currentGroup: s.currentGroup ?? group,
    }));
    return { error: null };
  },
  updateGroup: async (group, { newName, newImage }) => {
    const account_id = useAuthStore.getState().account.id;
    const filePath =
      group.image_url != ""
        ? group.image_url
        : `${account_id}/images/group_avatars/${dayjs().toISOString()}.png`;
    let image_url;
    if (!newImage) {
      image_url = "";
    } else {
      const { publicUrl, error: uploadImageError } = await api.uploadImage({
        filePath,
        base64Image: newImage.base64,
      });
      if (uploadImageError)
        return { error: new Error(uploadImageError.message) };
      image_url = publicUrl;
    }

    const { error: updateGroupError } = await supabase
      .from("groups")
      .update({ name: newName, image_url })
      .eq("id", group.id);
    if (updateGroupError) return { error: new Error(updateGroupError.message) };
    return { error: null };
  },
  deleteGroup: async (group: Group) => {
    // check if can delete
    // delete from api
    // update state
    // set new group
    return { error: null };
  },
  activateGroup: (id: number) => {
    const groupToActivate = get().groups.filter((g) => g.id == id)[0];
    set({ currentGroup: groupToActivate });
  },
  addMember: async (account, group) => {
    const { error: createMemberError } = await supabase.from("members").insert({
      account_id: account.id,
      group_id: group.id,
    });
    return {
      error: createMemberError ? new Error(createMemberError.message) : null,
    };
  },
  removeMember: async (member) => {
    const { error } = await supabase
      .from("members")
      .delete()
      .eq("account_id", member.account_id)
      .eq("group_id", member.group_id);
    return { error: error ? new Error(error.message) : null };
  },
}));
