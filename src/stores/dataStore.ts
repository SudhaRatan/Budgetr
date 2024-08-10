import { create } from "zustand";
import { category, transaction } from "../types/dbTypes";

export interface dataStoreType {
    categories: Array<category> | null,
    transactions: Array<transaction> | null,
    setCategories: (categories: Array<category>) => void,
    setTransactions: (categories: Array<transaction>) => void,
}

export const useDataStore = create<dataStoreType>()((set, get) => ({
    categories: null,
    transactions: null,
    setCategories: (val) => set(() => ({ categories: val })),
    setTransactions: (val) => set(() => ({ transactions: val })),
}))