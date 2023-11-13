import { Account, Group, supabase } from "@/lib";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { ImageResult } from "expo-image-manipulator";
import { api } from "@/lib/api";
import dayjs from "dayjs";

interface GroupStoreState {
  groups: Group[];
  currentGroup: Group;
  initGroupStore: () => Promise<void>;
  fetchGroups: () => Promise<{ error: Error | null }>;
  createGroup: (data: {
    name: string;
    image?: ImageResult;
    members: Account[];
  }) => Promise<{ error: Error | null }>;
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
    if (!account_id) return { error: new Error("No user logged in") };

    const { data, error: fetchAccountGroupError } = await supabase
      .from("accounts_groups")
      .select("group:groups(*)")
      .eq("account_id", account_id);
    if (fetchAccountGroupError)
      return { error: new Error(fetchAccountGroupError.message) };
    const groups = data.map((e) => ({
      ...e.group,
    }));

    if (groups.length == 0) {
      get().createGroup({ name: "Nhóm", members: [] });
    } else {
      set((s) => ({ groups, currentGroup: s.currentGroup ?? groups[0] }));
    }
    return { error: null };
  },
  createGroup: async ({ name, image, members }) => {
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

    const accountGroupRows = members.map((m) => ({
      account_id: m.id,
      group_id: group.id,
      is_admin: false,
      status: "invited",
    }));

    const { error: createAccountGroupError } = await supabase
      .from("accounts_groups")
      .insert([
        {
          account_id,
          group_id: group.id,
          is_admin: true,
          status: "active",
        },
        ...accountGroupRows,
      ]);
    if (createAccountGroupError)
      return { error: new Error(createAccountGroupError.message) };

    // for each phone number in memberPhones, file and create an invitation for that memeber to join the created group

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
