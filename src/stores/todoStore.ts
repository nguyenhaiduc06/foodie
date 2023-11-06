import { create } from "zustand";
import { Todo, supabase } from "@/lib";
import { useUserStore } from "./userStore";
import dayjs from "dayjs";

interface TodoStoreState {
  todos: Todo[];
  date: Date;
  fetching: boolean;
  initTodoStore: () => void;
  fetchTodos: () => void;
  addTodo: (data: {
    name: string;
    amount: string;
    date: Date;
  }) => Promise<{ error: Error | null }>;
  updateTodo: (
    id: number,
    data: {
      name: string;
      amount: number;
    }
  ) => void;
  deleteTodo: (id: number) => void;
  setTodoChecked: (id: number, checked: boolean) => void;
  setDate: (date: Date) => void;
}

export const useTodoStore = create<TodoStoreState>()((set, get) => ({
  todos: [],
  date: new Date(),
  fetching: false,
  initTodoStore: async () => {
    useUserStore.subscribe((s) => {
      if (s.user?.id) {
        get().fetchTodos();
      }
    });
  },
  fetchTodos: async () => {
    set({ fetching: true });

    const user_id = useUserStore.getState().user?.id;
    if (!user_id) return;

    const date = get().date;
    const startOfDate = dayjs(date).startOf("date").toISOString();
    const endOfDate = dayjs(date).endOf("date").toISOString();

    const { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .lte("date", endOfDate)
      .gte("date", startOfDate);

    set({ fetching: false });

    if (!error) {
      set({ todos });
    }
  },
  addTodo: async ({ name, amount, date }) => {
    const user_id = useUserStore.getState().session.user.id;
    const { data: newTodo, error } = await supabase
      .from("todos")
      .insert({ name, amount, date: date.toISOString(), user_id })
      .select()
      .single();
    if (error) return { error: new Error(error.message) };

    set((state) => ({ todos: [newTodo, ...state.todos] }));
    return { error: null };
  },
  updateTodo: async (id, newData) => {
    const { data: updatedTodo, error } = await supabase
      .from("todos")
      .update(newData)
      .eq("id", id)
      .select()
      .single();
    if (error) return error;
    const newTodos = get().todos.map((todo) =>
      todo.id == id ? updatedTodo : todo
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
  setDate: (date) => {
    set({ date });
    get().fetchTodos();
  },
}));
