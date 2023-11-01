import { create } from "zustand";
import { Recipe } from "../types";

interface RecipeState {
  recipes: Recipe[];
  date: number;
  fetchRecipes: () => void;
  createRecipe: () => void;
  updateRecipe: () => void;
  deleteRecipe: () => void;
  setDate: () => void;
}
export const useRecipeStore = create<RecipeState>()((set) => ({
  recipes: [],
  date: Date.now(),
  fetchRecipes: () => {},
  createRecipe: () => {},
  updateRecipe: () => {},
  deleteRecipe: () => {},
  setDate: () => {},
}));
