import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib";
import { Profile } from "@/lib";

interface UserStoreState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  initUserStore: () => void;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  signUpWithEmail: (email: string, password: string) => void;
  signOut: () => void;
  createProfile: (name) => void;
  updateProfile: (newName) => void;
}

export const useUserStore = create<UserStoreState>()((set, get) => ({
  session: null,
  user: null,
  profile: null,
  initUserStore: async () => {
    // get session, user, profile
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null });
    if (session && session.user) {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      set({ profile });
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ session, user: session?.user ?? null });

      if (session && session.user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();
        set({ profile });
      }
    });
  },
  signInWithEmail: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) return { data: null, error };
    return supabase
      .from("profiles")
      .select("*")
      .eq("user_id", data.user.id)
      .single();
  },
  signUpWithEmail: async (email, password) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) return error;
    set({ session });
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
  createProfile: async (name) => {
    const user_id = get().user.id;
    const { data: profile, error } = await supabase
      .from("profiles")
      .insert({ name, user_id })
      .select()
      .single();
    set({ profile });
  },
  updateProfile: async (newName) => {
    const user_id = get().user.id;
    const { data: profile, error } = await supabase
      .from("profiles")
      .insert({ name: newName, user_id })
      .select()
      .single();
    set({ profile });
  },
}));
