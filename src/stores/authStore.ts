import { create } from "zustand";
import { supabase, Account } from "@/lib";

interface AuthStoreState {
  authed: boolean;
  account: Account | null;
  initAuthStore: () => Promise<void>;
  signIn: (data: {
    email: string;
    password: string;
  }) => Promise<{ account: Account | null; error: Error | null }>;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  createAccount: (data: { name: string }) => Promise<{ error: Error | null }>;
  updateAccount: (date: { name: string }) => Promise<{ error: Error | null }>;
}

export const useAuthStore = create<AuthStoreState>()((set, get) => ({
  authed: false,
  account: null,
  initAuthStore: async () => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      const user_id = user?.id;
      if (!user_id) {
        set({ authed: false });
        return;
      }

      const { data: account } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user_id)
        .single();
      const authed = session && user && account ? true : false;
      set({ authed, account });
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;
    if (!user_id) {
      set({ authed: false });
      return;
    }

    const { data: account } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user_id)
      .single();
    const authed = session && user && account ? true : false;
    set({ authed, account });
  },
  signIn: async ({ email, password }) => {
    const {
      data: { user },
      error: signInError,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (signInError)
      return { account: null, error: new Error(signInError.message) };

    const { data: account, error: getAccountError } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    if (getAccountError)
      return { account: null, error: new Error(getAccountError.message) };

    return { account, error: null };
  },
  signUp: async ({ name, email, password }) => {
    const {
      data: { user },
      error: signUpError,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (signUpError) return { error: new Error(signUpError.message) };

    const { data: account, error: createAccountError } = await supabase
      .from("accounts")
      .insert({
        name,
        user_id: user.id,
      })
      .select()
      .single();
    if (createAccountError)
      return { error: new Error(createAccountError.message) };

    const { data: group, error: createGroupError } = await supabase
      .from("groups")
      .insert({
        name,
      })
      .select()
      .single();
    if (createGroupError) return { error: new Error(createGroupError.message) };

    const { error: createAccountGroupError } = await supabase
      .from("accounts_groups")
      .insert({
        account_id: account.id,
        group_id: group.id,
        is_admin: true,
        status: "active",
      })
      .select()
      .single();
    if (createAccountGroupError)
      return { error: new Error(createAccountGroupError.message) };
  },
  signOut: async () => {
    await supabase.auth.signOut();
  },
  createAccount: async ({ name }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;
    if (!user_id) return { error: new Error("No user logged in") };

    const { data: account, error } = await supabase
      .from("accounts")
      .insert({ name, email: user?.email, avatar_url: "", user_id })
      .select()
      .single();
    set({ account });
    return { error: error ? new Error(error.message) : null };
  },
  updateAccount: async ({ name }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;
    if (!user_id) return { error: new Error("No user logged in") };

    const { data: account, error } = await supabase
      .from("accounts")
      .update({ name })
      .eq("id", get().account.id)
      .select()
      .single();
    set({ account });
    return { error: error ? new Error(error.message) : null };
  },
}));
