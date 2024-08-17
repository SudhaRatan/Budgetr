import { create } from "zustand";
import { category, transaction } from "../types/dbTypes";

export interface dataStoreType {
  categories: Array<category> | null;
  transactions: Array<transaction> | null;
  debitCategories: Array<category> | null;
  setCategories: (categories: Array<category> | null) => void;
  setDebitCategories: (categories: Array<category> | null) => void;
  setTransactions: (categories: Array<transaction>) => void;
}

export const useDataStore = create<dataStoreType>()((set, get) => ({
  categories: null,
  transactions: null,
  debitCategories: null,
  setCategories: (val) => set(() => ({ categories: val })),
  setDebitCategories: (val) => set(() => ({ debitCategories: val })),
  setTransactions: (val) => set(() => ({ transactions: val })),
}));
