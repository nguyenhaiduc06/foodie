import { create } from "zustand";
import { supabase, Dish } from "@/lib";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { useGroupStore } from "./groupStore";
import dayjs from "dayjs";
import { api } from "@/lib/api";
import { Alert } from "react-native";

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
  }) => Promise<void>;
  updateDish: (
    id: string,
    data: {
      name: string;
      date: Date;
      meal: string;
      image: ImagePicker.ImagePickerAsset;
    }
  ) => Promise<void>;
  deleteDish: (id: string) => Promise<void>;
  setDate: (date: Date) => void;
}

export const useDishStore = create<DishStoreState>()((set, get) => ({
  dishes: [],
  fetching: false,
  date: dayjs().toDate(),
  initDishStore: async () => {
    get().fetchDishes();

    useGroupStore.subscribe((s) => {
      if (s.currentGroup?.id) {
        get().fetchDishes();
      }
    });
  },
  fetchDishes: async () => {
    set({ fetching: true });
    const { dishes, error } = await api.getDishes(
      useGroupStore.getState().currentGroup?.id,
      get().date
    );
    set({ fetching: false });
    if (error) return Alert.alert(error.message);
    set({ dishes });
  },
  createDish: async ({ name, meal, date, image }) => {
    const image_url = image ? await api.uploadDishImage(image.base64) : null;
    const { dish, error } = await api.createDish({
      group_id: useGroupStore.getState().currentGroup?.id,
      date,
      name,
      meal,
      image_url,
    });
    if (error) return Alert.alert(error.message);
    set((s) => ({ dishes: [dish, ...s.dishes] }));
  },
  updateDish: async (id, { name, meal, date, image }) => {
    const image_url = image?.base64
      ? await api.uploadDishImage(image.base64)
      : image.uri;
    const { dish: updatedDish, error } = await api.updateDish(id, {
      date,
      name,
      meal,
      image_url,
    });
    if (error) return Alert.alert(error.message);
    const newDishes = get().dishes.map((dish) =>
      dish.id == updatedDish.id ? updatedDish : dish
    );
    set({ dishes: newDishes });
  },
  deleteDish: async (id) => {
    const { error } = await api.deleteDish(id);
    if (error) return Alert.alert(error.message);
    const newDishes = get().dishes.filter((dish) => dish.id != id);
    set({ dishes: newDishes });
  },
  setDate: (date) => {
    set({ date });
    get().fetchDishes();
  },
}));

const uploadImage = async (image) => {
  const group_id = useGroupStore.getState().currentGroup?.id;
  const id = dayjs().toISOString();
  const filePath = `${group_id}/images/dish/${id}.png`;

  const { error: fileUploadError } = await supabase.storage
    .from("files")
    .upload(filePath, decode(image.base64), {
      contentType: "image/png",
      upsert: true,
    });
  if (fileUploadError) return { error: new Error(fileUploadError.message) };

  const {
    data: { publicUrl },
  } = supabase.storage.from("files").getPublicUrl(filePath);
  return publicUrl;
};
