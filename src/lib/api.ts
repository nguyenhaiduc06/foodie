import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { Database } from "./database.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://vfacmpirjrvdgusdxgfo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYWNtcGlyanJ2ZGd1c2R4Z2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NzQwMjQsImV4cCI6MjAxNDI1MDAyNH0.Z_3NyaWtoh3f4ZEkllSibxJp9NnF22NKud2uoM66Gjo";

class Api {
  private supabase: SupabaseClient<Database>;
  constructor() {
    this.supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }
  async getAccount({ phone }) {
    const { data: account, error } = await this.supabase
      .from("accounts")
      .select("*")
      .eq("email", phone)
      .single();
    return account;
  }
  async uploadImage({ filePath, base64Image }) {
    const { error: fileUploadError } = await this.supabase.storage
      .from("files")
      .upload(filePath, decode(base64Image), {
        contentType: "image/png",
        upsert: true,
      });
    if (fileUploadError)
      return {
        error: new Error(
          "Error when uploading image: " + fileUploadError.message
        ),
      };

    const {
      data: { publicUrl },
    } = this.supabase.storage.from("files").getPublicUrl(filePath);
    return { publicUrl, error: null };
  }
}

export const api = new Api();
