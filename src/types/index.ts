import { Database } from "../lib/database.types";

export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Recipe = {
  name: string;
  content: string;
};
