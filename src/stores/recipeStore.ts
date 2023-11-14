import { create } from "zustand";
import { supabase, Recipe } from "@/lib";
import { useGroupStore } from "./groupStore";
import { ImageResult } from "expo-image-manipulator";
import { api } from "@/lib/api";
import { useAuthStore } from "./authStore";
import dayjs from "dayjs";

interface RecipeStoreState {
  recipes: Recipe[];
  date: number;
  fetching: boolean;
  initRecipeStore: () => void;
  fetchRecipes: () => void;
  createRecipe: (data: {
    name: string;
    content: string;
    image: ImageResult;
  }) => Promise<{ error: Error | null }>;
  updateRecipe: (
    recipe: Recipe,
    data: {
      name: string;
      content: string;
    }
  ) => Promise<{ error: Error | null }>;
  deleteRecipe: (recipe: Recipe) => Promise<{ error: Error | null }>;
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
  createRecipe: async ({ name, content, image }) => {
    const group_id = useGroupStore.getState().currentGroup?.id;
    const account_id = useAuthStore.getState().account?.id;
    if (!group_id) return;

    const filePath = `${group_id}/images/recipes/${account_id}-${dayjs().toISOString()}.png`;

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

    const { data: newRecipe, error: createRecipeError } = await supabase
      .from("recipes")
      .insert({ name, content, image_url, group_id })
      .select()
      .single();

    if (createRecipeError) {
      return { error: new Error(createRecipeError.message) };
    }

    set((s) => ({ recipes: [newRecipe, ...s.recipes] }));
    return { error: null };
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
