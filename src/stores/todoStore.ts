import { create } from "zustand";
import { Todo } from "@/lib";
import { useGroupStore } from "./groupStore";
import { api } from "@/lib/api";
import { Alert } from "react-native";

interface TodoStoreState {
  todos: Todo[];
  date: Date;
  fetching: boolean;
  initTodoStore: () => void;
  fetchTodos: () => void;
  addTodo: (data: { name: string; amount: string; date: Date }) => void;
  updateTodo: (
    id: number,
    data: { date: Date; name: string; amount: string; checked: boolean }
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
    get().fetchTodos();

    useGroupStore.subscribe((s) => {
      if (s.currentGroup?.id) {
        get().fetchTodos();
      }
    });
  },
  fetchTodos: async () => {
    set({ fetching: true });
    const { todos, error } = await api.getTodos(
      useGroupStore.getState().currentGroup?.id,
      get().date
    );
    set({ fetching: false });
    if (error) return Alert.alert(error.message);
    set({ todos });
  },
  addTodo: async ({ name, amount, date }) => {
    const { todo, error } = await api.createTodo({
      group_id: useGroupStore.getState().currentGroup?.id,
      date,
      name,
      amount,
    });
    if (error) return Alert.alert(error.message);
    const newTodos = [todo, ...get().todos];
    set({ todos: newTodos });
  },
  updateTodo: async (id, { date, name, amount, checked }) => {
    const { todo: updatedTodo, error } = await api.updateTodo(id, {
      date,
      name,
      amount,
      checked,
    });

    if (error) return Alert.alert(error.message);
    const newTodos = get().todos.map((todo) =>
      todo.id == updatedTodo ? updatedTodo : todo
    );
    set({ todos: newTodos });
  },
  deleteTodo: async (id) => {
    const { error } = await api.deleteTodo(id);
    if (error) return Alert.alert(error.message);
    const newTodos = get().todos.filter((todo) => todo.id != id);
    set({ todos: newTodos });
  },
  setTodoChecked: async (id, checked) => {
    //@ts-ignore
    const { todo, error } = await api.updateTodo(id, {
      checked,
    });
    if (error) return Alert.alert(error.message);
  },
  setDate: (date) => {
    set({ date });
    get().fetchTodos();
  },
}));
