import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase, Profile } from "@/lib";

interface AuthStoreState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  initUserStore: () => Promise<void>;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ profile?: Profile; error?: Error }>;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  createProfile: (data: { name: string }) => Promise<{ error?: Error }>;
  updateProfile: (date: { name: string }) => Promise<{ error?: Error }>;
}

export const useAuthStore = create<AuthStoreState>()((set, get) => ({
  session: null,
  user: null,
  profile: null,
  initUserStore: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ session, user });
    await get().fetchProfile();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      set({ session, user });
      get().fetchProfile();
    });
  },
  signInWithEmail: async (email, password) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) return { error };

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    return { profile };
  },
  signUpWithEmail: async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    return { error };
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
  fetchProfile: async () => {
    const user_id = get().user.id;
    if (!user_id) {
      set({ profile: null });
      return;
    }
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id)
      .single();
    set({ profile });
  },
  createProfile: async ({ name }) => {
    const user_id = get().user.id;
    const { data: profile, error } = await supabase
      .from("profiles")
      .insert({ name, user_id })
      .select()
      .single();
    set({ profile });
    if (error) return { error: new Error(error.message) };
  },
  updateProfile: async ({ name }) => {
    const profile_id = get().profile.id;
    const { data: profile, error } = await supabase
      .from("profiles")
      .update({ name })
      .eq("id", profile_id)
      .select()
      .single();
    set({ profile });
    if (error) return { error: new Error(error.message) };
  },
}));
