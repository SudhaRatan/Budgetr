import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type toggleType = "Categories" | "Transactions";
type themeType = "light-content" | "dark-content" | "default";

interface preferenceStoreType {
  toggleType: toggleType;
  setToggleType: (val: toggleType) => void;
  theme: string;
  setTheme: (val: string) => void;
}

export const usePrefereneStore = create<preferenceStoreType>()(
  persist(
    (set, get) => ({
      toggleType: "Categories",
      setToggleType: (val) => set(() => ({ toggleType: val })),
      theme: "default",
      setTheme: (val: string) => set(() => ({ theme: val })),
    }),
    { name: "preferenceStore", storage: createJSONStorage(() => AsyncStorage) }
  )
);
