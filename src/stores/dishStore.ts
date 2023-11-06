import { create } from "zustand";
import { supabase, Dish } from "@/lib";
import { useUserStore } from "./userStore";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

interface DishStoreState {
  dishes: Dish[];
  fetching: boolean;
  date: Date;
  initDishStore: () => void;
  fetchDishes: () => void;
  createDish: (data: {
    name: string;
    date: Date;
    meal: string;
    image: ImagePicker.ImagePickerAsset;
  }) => Promise<{ error: Error | null }>;
  setDate: (date: Date) => void;
}

export const useDishStore = create<DishStoreState>()((set, get) => ({
  dishes: [],
  fetching: false,
  date: new Date(Date.now()),
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
  createDish: async ({ name, meal, date, image }) => {
    const user_id = useUserStore.getState().user.id;

    const image_url = image ? ((await uploadImage(image)) as string) : "";

    const { data: newDish, error: dishCreateError } = await supabase
      .from("dishes")
      .insert({ name, meal, image_url, date: date.toISOString(), user_id })
      .select()
      .single();
    if (dishCreateError) return { error: new Error(dishCreateError.message) };

    set((s) => ({ dishes: [newDish, ...s.dishes] }));
    return { error: null };
  },
  setDate: (date) => {
    set({ date });
  },
}));

const uploadImage = async (image) => {
  const user_id = useUserStore.getState().user.id;
  const base64 = await FileSystem.readAsStringAsync(image.uri, {
    encoding: "base64",
  });
  const id = 2;
  const filePath = `${user_id}/images/dish/${id}.png`;

  const { error: fileUploadError } = await supabase.storage
    .from("files")
    .upload(filePath, decode(base64), { contentType: "image/png" });
  if (fileUploadError) return { error: new Error(fileUploadError.message) };

  const {
    data: { publicUrl },
  } = supabase.storage.from("files").getPublicUrl(filePath);
  return publicUrl;
};
