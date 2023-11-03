import { create } from "zustand";
import { supabase, Dish } from "@/lib";
import { useUserStore } from "./userStore";

interface DishStoreState {
  dishes: Dish[];
  fetching: boolean;
  initDishStore: () => void;
  fetchDishes: () => void;
  createDish: () => void;
}

export const useDishStore = create<DishStoreState>()((set, get) => ({
  dishes: [],
  fetching: false,
  initDishStore: async () => {
    useUserStore.subscribe((s) => {
      if (s.user?.id) {
        get().fetchDishes();
      }
    });
  },
  fetchDishes: async () => {
    set({ fetching: true });

    const user_id = useUserStore.getState().user?.id;
    if (!user_id) return;

    const { data: dishes, error } = await supabase
      .from("dishes")
      .select("*")
      .eq("user_id", user_id);

    set({ fetching: false });

    if (!error) {
      set({ dishes });
    }
  },
  createDish: () => {},
}));
