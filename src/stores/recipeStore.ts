import { create } from "zustand";
import { supabase, Recipe } from "@/lib";
import { useGroupStore } from "./groupStore";
import { ImageResult } from "expo-image-manipulator";
import { api } from "@/lib/api";
import { useAuthStore } from "./authStore";
import dayjs from "dayjs";
import { Alert } from "react-native";

interface RecipeStoreState {
  recipes: Recipe[];
  date: number;
  fetching: boolean;
  initRecipeStore: () => void;
  fetchRecipes: () => void;
  createRecipe: (data: any) => void;
  updateRecipe: (id: number, data: any) => void;
  deleteRecipe: (id: number) => void;
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
    const { recipes, error } = await api.getRecipes(
      useGroupStore.getState().currentGroup?.id
    );
    set({ fetching: false });
    if (error) return Alert.alert(error.message);
    set({ recipes });
  },
  createRecipe: async ({ name, content, image }) => {
    const { recipe, error } = await api.createRecipe({
      group_id: useGroupStore.getState().currentGroup.id,
      name,
      content,
      image_url: "",
    });
    if (error) return Alert.alert(error.message);
    const newRecipes = [recipe, ...get().recipes];
    set({ recipes: newRecipes });
  },
  updateRecipe: async (recipe, { name, content }) => {
    const group_id = useGroupStore.getState().currentGroup?.id;
    if (!group_id) return;

    const { data: updatedRecipe, error: updateRecipeError } = await supabase
      .from("recipes")
      .update({ name, content })
      .eq("id", recipe.id)
      .select()
      .single();
    if (updateRecipeError) {
      return { error: new Error(updateRecipeError.message) };
    }

    set((s) => ({
      recipes: s.recipes.map((recipe) =>
        recipe.id == updatedRecipe.id ? updatedRecipe : recipe
      ),
    }));
    return { error: null };
  },
  deleteRecipe: async (recipeToDelete) => {
    const { error: deleteRecipeError } = await supabase
      .from("recipes")
      .delete()
      .eq("id", recipeToDelete.id);
    if (deleteRecipeError) {
      return { error: new Error(deleteRecipeError.message) };
    }

    set((s) => ({
      recipes: s.recipes.filter((recipe) => recipe.id != recipeToDelete.id),
    }));
    return { error: null };
  },
  setDate: () => {},
}));
