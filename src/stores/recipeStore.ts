import { create } from "zustand";
import { supabase, Recipe } from "@/lib";
import { useUserStore } from "./userStore";

interface RecipeStoreState {
  recipes: Recipe[];
  date: number;
  fetching: boolean;
  initRecipeStore: () => void;
  fetchRecipes: () => void;
  createRecipe: () => void;
  updateRecipe: () => void;
  deleteRecipe: () => void;
  setDate: () => void;
}
export const useRecipeStore = create<RecipeStoreState>()((set, get) => ({
  recipes: [],
  date: Date.now(),
  fetching: false,
  initRecipeStore: async () => {
    useUserStore.subscribe((s) => {
      if (s.user?.id) {
        get().fetchRecipes();
      }
    });
  },
  fetchRecipes: async () => {
    set({ fetching: true });

    const user_id = useUserStore.getState().user?.id;
    if (!user_id) return;

    const { data: recipes, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("user_id", user_id);

    set({ fetching: false });

    if (!error) {
      set({ recipes });
    }
  },
  createRecipe: () => {},
  updateRecipe: () => {},
  deleteRecipe: () => {},
  setDate: () => {},
}));
