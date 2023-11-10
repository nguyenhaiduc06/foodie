import { create } from "zustand";
import { supabase, Recipe } from "@/lib";
import { useGroupStore } from "./groupStore";

interface RecipeStoreState {
  recipes: Recipe[];
  date: number;
  fetching: boolean;
  initRecipeStore: () => void;
  fetchRecipes: () => void;
  createRecipe: (data: {
    name: string;
    content: string;
  }) => Promise<{ error: Error | null }>;
  updateRecipe: () => void;
  deleteRecipe: () => void;
  setDate: () => void;
}
export const useRecipeStore = create<RecipeStoreState>()((set, get) => ({
  recipes: [],
  date: Date.now(),
  fetching: false,
  initRecipeStore: async () => {
    get().fetchRecipes();

    useGroupStore.subscribe((s) => {
      if (s.currentGroup?.id) {
        get().fetchRecipes();
      }
    });
  },
  fetchRecipes: async () => {
    set({ fetching: true });

    const group_id = useGroupStore.getState().currentGroup?.id;
    if (!group_id) return;

    const { data: recipes, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("group_id", group_id);

    set({ fetching: false });

    if (!error) {
      set({ recipes });
    }
  },
  createRecipe: async ({ name, content }) => {
    const group_id = useGroupStore.getState().currentGroup?.id;
    if (!group_id) return;

    const { data: newRecipe, error: createRecipeError } = await supabase
      .from("recipes")
      .insert({ name, content, group_id })
      .select()
      .single();

    if (createRecipeError) {
      return { error: new Error(createRecipeError.message) };
    }

    set((s) => ({ recipes: [newRecipe, ...s.recipes] }));
    return { error: null };
  },
  updateRecipe: () => {},
  deleteRecipe: () => {},
  setDate: () => {},
}));
