import { create } from "zustand";
import { supabase } from "../lib/supabase";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface AppState {
  tasks: Task[];
  expenses: Expense[];
  selectedDate: string;

  user: any;

  setUser: (user: any) => void;

  setSelectedDate: (date: string) => void;

  // 🔥 DB ACTIONS
  fetchTasks: () => Promise<void>;
  addTask: (title: string, date: string) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;

  fetchExpenses: () => Promise<void>;
  addExpense: (expense: Expense) => Promise<void>;

  calculateStreak: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({

  tasks: [],
  expenses: [],
  selectedDate: new Date().toISOString().split("T")[0],
  user: null,

  setUser: (user) => set({ user }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  // 🔥 FETCH TASKS
  fetchTasks: async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    set({ tasks: data || [] });
  },

  // 🔥 ADD TASK
  addTask: async (title, date) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data } = await supabase
      .from("tasks")
      .insert({
        title,
        completed: false,
        date,
        user_id: user.id,
      })
      .select()
      .single();

    set((state) => ({
      tasks: [...state.tasks, data],
    }));
  },

  // 🔥 TOGGLE
  toggleTask: async (id, completed) => {
    await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id);

    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !completed } : t
      ),
    }));
  },

  // 🔥 DELETE
  deleteTask: async (id) => {
    await supabase.from("tasks").delete().eq("id", id);

    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }));
  },

  // 🔥 FETCH EXPENSES
  fetchExpenses: async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id);

    set({ expenses: data || [] });
  },

  // 🔥 ADD EXPENSE
  addExpense: async (expense) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data } = await supabase
      .from("expenses")
      .insert({
        ...expense,
        user_id: user.id,
      })
      .select()
      .single();

    set((state) => ({
      expenses: [...state.expenses, data],
    }));
  },

  // 🔥 RACHA REAL (desde DB)
  calculateStreak: () => {
    const { tasks, expenses } = get();

    const days = new Set([
      ...tasks.map((t) => t.date),
      ...expenses.map((e) => e.date),
    ]);

    let streak = 0;
    let current = new Date();

    while (true) {
      const d = current.toISOString().slice(0, 10);
      if (days.has(d)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else break;
    }

    return streak;
  },

}));