import { create } from "zustand";
import { Account } from "@/lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/lib/api";
import { Alert } from "react-native";

interface AuthStoreState {
  authed: boolean;
  account: Account | null;
  initAuthStore: () => void;
  signIn: (data: {
    username: string;
    password: string;
  }) => Promise<{ error?: string }>;
  signUp: (data: {
    name: string;
    username: string;
    password: string;
  }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateAccount: (data: any) => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()((set, get) => ({
  authed: false,
  account: null,
  initAuthStore: async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      set({ authed: false });
    } else {
      const { account, error } = await api.signInWithToken(token);
      if (error) {
      } else {
        set({ authed: true, account });
      }
    }
  },
  signIn: async ({ username, password }) => {
    const { account, token, error } = await api.signIn({ username, password });
    if (error) {
      return { error };
    } else {
      AsyncStorage.setItem("token", token);
      set({ authed: true, account });
      return { error: null };
    }
  },
  signUp: async ({ name, username, password }) => {
    const { account, token, error } = await api.signUp({
      name,
      username,
      password,
    });
    if (error) {
      return { error };
    } else {
      AsyncStorage.setItem("token", token);
      set({ authed: true, account });
      return { error: null };
    }
  },
  signOut: async () => {
    AsyncStorage.removeItem("token");
  },
  updateAccount: async ({ name, username, image }) => {
    const avatar_url = image?.base64
      ? await api.uploadRecipieImage(image.base64)
      : image.uri;
    const { account, token, error } = await api.updateAccount(
      get().account.id,
      {
        name,
        username,
        avatar_url,
      }
    );
    if (error) return Alert.alert(error);
    AsyncStorage.setItem("token", token);
    set({ account });
  },
}));
