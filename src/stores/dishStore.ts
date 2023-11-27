import { create } from "zustand";
import { supabase, Dish } from "@/lib";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { useGroupStore } from "./groupStore";
import dayjs from "dayjs";

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
  updateDish: (
    id: string,
    data: {
      name: string;
      date: Date;
      meal: string;
      image: ImagePicker.ImagePickerAsset;
    }
  ) => Promise<{ error: Error | null }>;
  setDate: (date: Date) => void;
}

export const useDishStore = create<DishStoreState>()((set, get) => ({
  dishes: [],
  fetching: false,
  date: new Date(Date.now()),
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

    const group_id = useGroupStore.getState().currentGroup?.id;
    if (!group_id) return;

    const date = get().date;
    const startOfDate = dayjs(date).startOf("date").toISOString();
    const endOfDate = dayjs(date).endOf("date").toISOString();

    const { data: dishes, error } = await supabase
      .from("dishes")
      .select("*")
      .lte("date", endOfDate)
      .gte("date", startOfDate)
      .eq("group_id", group_id);

    set({ fetching: false });

    if (!error) {
      set({ dishes });
    }
  },
  createDish: async ({ name, meal, date, image }) => {
    const group_id = useGroupStore.getState().currentGroup?.id;

    const image_url = image ? ((await uploadImage(image)) as string) : "";

    const { data: newDish, error: dishCreateError } = await supabase
      .from("dishes")
      .insert({ name, meal, image_url, date: date.toISOString(), group_id })
      .select()
      .single();
    if (dishCreateError) return { error: new Error(dishCreateError.message) };

    set((s) => ({ dishes: [newDish, ...s.dishes] }));
    return { error: null };
  },
  updateDish: async (id, { name, meal, date, image }) => {
    return { error: null };
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
  console.log({ fileUploadError });
  if (fileUploadError) return { error: new Error(fileUploadError.message) };

  const {
    data: { publicUrl },
  } = supabase.storage.from("files").getPublicUrl(filePath);
  return publicUrl;
};
