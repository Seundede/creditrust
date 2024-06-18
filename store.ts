import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  title: string;
}

export interface StoreState {
  transaction: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransaction: () => void;
}

// Custom secure storage implementation compatible with Zustand
const secureStorage: PersistStorage<StoreState> = {
  getItem: async (name: string) => {
    const value = await SecureStore.getItemAsync(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    await SecureStore.setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      transaction: [],
      runTransaction: (transaction: Transaction) => {
        set((state) => ({
          transaction: [...state.transaction, transaction],
        }));
      },
      balance: () =>
        get().transaction.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        ),
      clearTransaction: () => {
        set({ transaction: [] });
      },
    }),
    {
      name: "balance",
      storage: secureStorage,
    }
  )
);
