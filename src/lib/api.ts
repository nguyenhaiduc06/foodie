import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { Database } from "./database.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios } from "axios";

const supabaseUrl = "https://vfacmpirjrvdgusdxgfo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYWNtcGlyanJ2ZGd1c2R4Z2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NzQwMjQsImV4cCI6MjAxNDI1MDAyNH0.Z_3NyaWtoh3f4ZEkllSibxJp9NnF22NKud2uoM66Gjo";

class Api {
  private axios: Axios;
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });
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
  async getAccount({ email }) {
    // const { data, error } = await this.supabase
    //   .from("accounts")
    //   .select("*")
    //   .eq("email", email)
    //   .single();
    // return { data, error };
  }
  async uploadImage({ filePath, base64Image }) {
    // const { error: fileUploadError } = await this.supabase.storage
    //   .from("files")
    //   .upload(filePath, decode(base64Image), {
    //     contentType: "image/png",
    //     upsert: true,
    //   });
    // if (fileUploadError)
    //   return {
    //     error: new Error(
    //       "Error when uploading image: " + fileUploadError.message
    //     ),
    //   };
    // const {
    //   data: { publicUrl },
    // } = this.supabase.storage.from("files").getPublicUrl(filePath);
    // return { publicUrl, error: null };
  }
}

export const api = new Api("http://192.168.31.60:3000/");
