import { Database } from "../lib/database.types";

export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
export type Storage = Database["public"]["Tables"]["storages"]["Row"];
export type Dish = Database["public"]["Tables"]["dishes"]["Row"];
export type Group = Database["public"]["Tables"]["groups"]["Row"];
export type Member = Database["public"]["Tables"]["members"]["Row"];
