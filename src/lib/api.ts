import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { Database } from "./database.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";
import dayjs from "dayjs";

const supabaseUrl = "https://vfacmpirjrvdgusdxgfo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYWNtcGlyanJ2ZGd1c2R4Z2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NzQwMjQsImV4cCI6MjAxNDI1MDAyNH0.Z_3NyaWtoh3f4ZEkllSibxJp9NnF22NKud2uoM66Gjo";

class Api {
  private axios: Axios;
  private supabase;
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });
    this.supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  async getAccount(email) {
    const res = await this.axios.get(`/users?email=${email}`);
    const { data, error } = res.data;
    return { account: data, error };
  }
  async getGroups(account_id) {
    if (!account_id) return;
    const res = await this.axios.get(`/groups?account_id=${account_id}`);
    const { data, error } = res.data;
    return { groups: data, error };
  }
  async createGroup({ name, image_url, manager_id, member_ids }) {
    if (!name) return;
    const res = await this.axios.post(`/groups`, {
      name,
      image_url,
      manager_id,
      member_ids,
    });
    const { data, error } = res.data;
    return { group: data, error };
  }
  async updateGroup(id, { name, image_url }) {
    if (!name) return;
    const res = await this.axios.put(`/groups/${id}`, {
      name,
      image_url,
    });
    const { data, error } = res.data;
    return { group: data, error };
  }
  async deleteGroup(id) {
    const res = await this.axios.delete(`/groups/${id}`);
    const { error } = res.data;
    return { error };
  }

  async getTodos(group_id, date) {
    if (!group_id || !date) return;
    const res = await this.axios.get(
      `/todos?group_id=${group_id}&date=${date}`
    );
    const { data, error } = res.data;
    return { todos: data, error };
  }
  async createTodo({ group_id, date, name, amount }) {
    if (!group_id || !date || !name || !amount) return;
    const res = await this.axios.post(`/todos`, {
      group_id,
      date,
      name,
      amount,
    });
    const { data, error } = res.data;
    return { todo: data, error };
  }
  async updateTodo(id, { date, name, amount, checked }) {
    const res = await this.axios.put(`/todos/${id}`, {
      date,
      name,
      amount,
      checked,
    });
    const { data, error } = res.data;
    return { todo: data, error };
  }
  async deleteTodo(id) {
    const res = await this.axios.delete(`/todos/${id}`);
    const { error } = res.data;
    return { error };
  }

  async getDishes(group_id, date) {
    if (!group_id || !date) return;
    const res = await this.axios.get(
      `/dishes?group_id=${group_id}&date=${date}`
    );
    const { data, error } = res.data;
    return { dishes: data, error };
  }
  async createDish({ group_id, date, name, meal, image_url }) {
    if (!group_id || !date || !name || !meal) return;
    const res = await this.axios.post(`/dishes`, {
      group_id,
      date,
      name,
      meal,
      image_url,
    });
    const { data, error } = res.data;
    return { dish: data, error };
  }
  async updateDish(id, { date, name, meal, image_url }) {
    if (!date || !name || !meal) return;
    const res = await this.axios.put(`/dishes/${id}`, {
      date,
      name,
      meal,
      image_url,
    });
    const { data, error } = res.data;
    return { dish: data, error };
  }
  async deleteDish(id) {
    const res = await this.axios.delete(`/dishes/${id}`);
    const { error } = res.data;
    return { error };
  }

  async getStorages(group_id) {
    if (!group_id) return;
    const res = await this.axios.get(`/storages?group_id=${group_id}`);
    const { data, error } = res.data;
    return { storages: data, error };
  }
  async createStorage({
    group_id,
    name,
    amount,
    stored_in,
    expire_date,
    image_url,
  }) {
    if (!group_id || !name || !amount || !stored_in || !expire_date) return;
    const res = await this.axios.post(`/storages`, {
      group_id,
      name,
      amount,
      stored_in,
      expire_date,
      image_url,
    });
    const { data, error } = res.data;
    return { storage: data, error };
  }
  async updateStorage(id, { name, amount, stored_in, expire_date, image_url }) {
    if (!name || !amount || !stored_in || !expire_date) return;

    const res = await this.axios.put(`/storages/${id}`, {
      name,
      amount,
      stored_in,
      expire_date,
      image_url,
    });
    const { data, error } = res.data;
    return { storage: data, error };
  }
  async deleteStorage(id) {
    const res = await this.axios.delete(`/storages/${id}`);
    const { error } = res.data;
    return { error };
  }

  async getRecipes(group_id) {
    if (!group_id) return;
    const res = await this.axios.get(`/recipes?group_id=${group_id}`);
    const { data, error } = res.data;
    return { recipes: data, error };
  }
  async createRecipe({ group_id, name, content, image_url }) {
    if (!group_id || !name || !content) return;
    const res = await this.axios.post(`/recipes`, {
      group_id,
      name,
      content,
      image_url,
    });
    const { data, error } = res.data;
    return { recipe: data, error };
  }
  async updateRecipe(id, { name, content, image_url }) {
    if (!name || !content) return;

    const res = await this.axios.put(`/recipes/${id}`, {
      name,
      content,
      image_url,
    });
    const { data, error } = res.data;
    return { recipe: data, error };
  }
  async deleteRecipe(id) {
    const res = await this.axios.delete(`/recipes/${id}`);
    const { error } = res.data;
    return { error };
  }
  async uploadDishImage(base64Image) {
    const fileName = dayjs().toISOString();
    const filePath = `dish/${fileName}.png`;
    return this.uploadImage(filePath, base64Image);
  }

  async uploadStorageImage(base64Image) {
    const fileName = dayjs().toISOString();
    const filePath = `storage/${fileName}.png`;
    return this.uploadImage(filePath, base64Image);
  }

  async uploadRecipieImage(base64Image) {
    const fileName = dayjs().toISOString();
    const filePath = `recipe/${fileName}.png`;
    return this.uploadImage(filePath, base64Image);
  }

  async uploadGroupAvatar(base64Image) {
    const fileName = dayjs().toISOString();
    const filePath = `group/${fileName}.png`;
    return this.uploadImage(filePath, base64Image);
  }

  async uploadUserAvatar(base64Image) {
    const fileName = dayjs().toISOString();
    const filePath = `avatar/${fileName}.png`;
    return this.uploadImage(filePath, base64Image);
  }

  async uploadImage(filePath, image) {
    if (!image) return null;
    const { error } = await this.supabase.storage
      .from("images")
      .upload(filePath, decode(image), {
        contentType: "image/png",
        upsert: true,
      });
    if (error) return null;
    const {
      data: { publicUrl },
    } = this.supabase.storage.from("images").getPublicUrl(filePath);
    return publicUrl;
  }
}

export const api = new Api("http://192.168.31.60:3000/");
