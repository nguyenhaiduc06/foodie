import { create } from "zustand";
import { Todo, supabase } from "@/lib";
import { useAuthStore } from "./authStore";
import dayjs from "dayjs";
import { useGroupStore } from "./groupStore";

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
  setTodoChecked: (id: number, checked: boolean) => void;
  setDate: (date: Date) => void;
}

export const useTodoStore = create<TodoStoreState>()((set, get) => ({
  todos: [],
  date: new Date(),
  fetching: false,
  initTodoStore: async () => {
    get().fetchTodos();

    useGroupStore.subscribe((s) => {
      if (s.currentGroup?.id) {
        get().fetchTodos();
      }
    });
  },
  fetchTodos: async () => {
    set({ fetching: true });

    const group_id = useGroupStore.getState().currentGroup?.id;
    if (!group_id) return;

    const date = get().date;
    const startOfDate = dayjs(date).startOf("date").toISOString();
    const endOfDate = dayjs(date).endOf("date").toISOString();

    const { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .lte("date", endOfDate)
      .gte("date", startOfDate)
      .eq("group_id", group_id);

    set({ fetching: false });

    if (!error) {
      set({ todos });
    }
  },
  addTodo: async ({ name, amount, date }) => {
    const group_id = useGroupStore.getState().currentGroup?.id;
    const { data: newTodo, error } = await supabase
      .from("todos")
      .insert({ name, amount, date: date.toISOString(), group_id })
      .select()
      .single();
    if (error) return { error: new Error(error.message) };

    set((state) => ({ todos: [newTodo, ...state.todos] }));
    return { error: null };
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
