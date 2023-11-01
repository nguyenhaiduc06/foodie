import { create } from "zustand";
import { supabase } from "../lib";
import { useUserStore } from "@/stores";

interface TodoState {
  todos: any[];
  date: Date;
  fetchTodos: () => void;
  addTodo: (name: string, amount: number) => void;
  updateTodo: (
    id: number,
    data: {
      name: string;
      amount: number;
    },
  ) => void;
  deleteTodo: (id: number) => void;
  setTodoChecked: (id: number, checked: boolean) => void;
  setDate: (timestamp: number) => void;
}

export const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  date: new Date(),
  fetchTodos: async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*, categories(*)");
    console.log({ todos });
    set({ todos });
  },
  addTodo: async (name, amount) => {
    const userId = useUserStore.getState().session.user.id;
    const { data: newTodo, error } = await supabase
      .from("todos")
      .insert({ name, amount, user_id: userId })
      .select();
    set((state) => ({ todos: [newTodo, ...state.todos] }));
  },
  updateTodo: async (id, newData) => {
    const { data: updatedTodo, error } = await supabase
      .from("todos")
      .update(newData)
      .eq("id", id)
      .select();
    if (error) return error;
    const newTodos = get().todos.map((todo) =>
      todo.id == id ? updatedTodo : todo,
    );
    set({ todos: newTodos });
  },
  deleteTodo: async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) return error;
  },
  setTodoChecked: async (id, checked) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ checked })
      .eq("id", id)
      .select();
  },
  setDate: (timestamp) => {
    set({ date: new Date(timestamp) });
  },
}));
