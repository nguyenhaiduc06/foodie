import { Database } from "../lib/database.types";

export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
export type Storage = Database["public"]["Tables"]["storages"]["Row"];
export type Dish = Database["public"]["Tables"]["dishes"]["Row"];
export type Group = Database["public"]["Tables"]["groups"]["Row"];
