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
  createRecipe: (data: any) => Promise<void>;
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
    const image_url = image ? await api.uploadRecipieImage(image.base64) : null;
    const { recipe, error } = await api.createRecipe({
      group_id: useGroupStore.getState().currentGroup.id,
      name,
      content,
      image_url,
    });
    if (error) return Alert.alert(error.message);
    const newRecipes = [recipe, ...get().recipes];
    set({ recipes: newRecipes });
  },
  updateRecipe: async (id, { name, content, image }) => {
    const image_url = image?.base64
      ? await api.uploadRecipieImage(image.base64)
      : image.uri;
    const { recipe: updatedRecipe, error } = await api.updateRecipe(id, {
      name,
      content,
      image_url,
    });
    if (error) return Alert.alert(error.message);
    const newRecipes = get().recipes.map((recipe) =>
      recipe.id == updatedRecipe.id ? updatedRecipe : recipe
    );
    set({ recipes: newRecipes });
  },
  deleteRecipe: async (id) => {
    const { error } = await api.deleteRecipe(id);
    if (error) return Alert.alert(error.message);
    const newRecipes = get().recipes.filter((recipe) => recipe.id != id);
    set({ recipes: newRecipes });
  },
  setDate: () => {},
}));
